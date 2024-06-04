import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from '../entities/tournament.entity';
import { CreateTournamentDto, UpdateTournamentDto } from '../dtos/exportDto';
import { Player } from '../../player/entities/payer.entity';
import { MatchResult } from '../../Result/entities/resul.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentsRepository: Repository<Tournament>,
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @InjectRepository(MatchResult)
    private matchResultsRepository: Repository<MatchResult>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const tournament = this.tournamentsRepository.create(createTournamentDto);
    return this.tournamentsRepository.save(tournament);
  }

  async findAll(): Promise<Tournament[]> {
    return this.tournamentsRepository.find({ where: { isDeleted: false }, relations: ['matchResults'] });
  }

  async findOne(id: number): Promise<Tournament> {
    const tournament = await this.tournamentsRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['matchResults', 'matchResults.winner', 'matchResults.loser'],
    });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return tournament;
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    const tournament = await this.tournamentsRepository.preload({
      id,
      ...updateTournamentDto,
    });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return this.tournamentsRepository.save(tournament);
  }

  async remove(id: number): Promise<void> {
    const tournament = await this.findOne(id);
    tournament.isDeleted = true;
    await this.tournamentsRepository.save(tournament);
  }

  async addParticipants(tournamentId: number, playerIds: number[]): Promise<void> {
    const tournament = await this.findOne(tournamentId);
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }

    const allPlayers = await this.playersRepository.findByIds(playerIds);
    const players = allPlayers.filter(player => !player.isDeleted);

    if (players.length !== playerIds.length) {
      throw new BadRequestException('One or more players not found or deleted');
    }

    tournament.players = players;
    await this.tournamentsRepository.save(tournament);
  }


  async generateMatchups(tournamentId: number): Promise<void> {
    const tournament = await this.findOne(tournamentId);
    const players = tournament.players;

    if (players.length < 2) {
      throw new BadRequestException('Not enough players to generate matchups');
    }

    // Clear existing match results for this tournament
    await this.matchResultsRepository.delete({ tournament });

    // Generate random matchups
    const shuffledPlayers = players.sort(() => 0.5 - Math.random());
    for (let i = 0; i < shuffledPlayers.length - 1; i += 2) {
      const matchResult = this.matchResultsRepository.create({
        tournament,
        winner: shuffledPlayers[i],
        loser: shuffledPlayers[i + 1],
        winnerScore: 0,
        loserScore: 0,
      });
      await this.matchResultsRepository.save(matchResult);
    }
  }

  async registerMatchResult(tournamentId: number, matchId: number, winnerId: number, loserId: number, winnerScore: number, loserScore: number): Promise<MatchResult> {
    const matchResult = await this.matchResultsRepository.findOne({ where: { id: matchId, tournament: { id: tournamentId }, isDeleted: false } });
    if (!matchResult) {
      throw new NotFoundException(`MatchResult with ID ${matchId} not found in tournament ${tournamentId}`);
    }

    const winner = await this.playersRepository.findOne({ where: { id: winnerId, isDeleted: false } });
    const loser = await this.playersRepository.findOne({ where: { id: loserId, isDeleted: false } });

    if (!winner || !loser) {
      throw new BadRequestException('Winner or loser not found or deleted');
    }

    matchResult.winner = winner;
    matchResult.loser = loser;
    matchResult.winnerScore = winnerScore;
    matchResult.loserScore = loserScore;

    return this.matchResultsRepository.save(matchResult);
  }

  async getMatchResults(tournamentId: number, minScore: number, page: number, limit: number, order: 'ASC' | 'DESC'): Promise<MatchResult[]> {
    return this.matchResultsRepository.find({
      where: { tournament: { id: tournamentId }, winnerScore: minScore },
      order: { winnerScore: order },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['winner', 'loser'],
    });
  }
}
