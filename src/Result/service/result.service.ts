import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchResult } from '../entities/resul.entity';
import { CreateResultDto, UpdateMatchResultDto } from '../dtos/exportDto';
import { Player } from '../../player/entities/payer.entity';
import { Tournament } from '../../Tournament/entities/tournament.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(MatchResult)
    private matchResultsRepository: Repository<MatchResult>,
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @InjectRepository(Tournament)
    private tournamentsRepository: Repository<Tournament>,
  ) {}

  async create(createMatchResultDto: CreateResultDto): Promise<MatchResult> {
    const { tournamentId, winnerId, loserId, winnerScore, loserScore } = createMatchResultDto;

    const tournament = await this.tournamentsRepository.findOne({ where: { id: tournamentId, isDeleted: false } });
    const winner = await this.playersRepository.findOne({ where: { id: winnerId, isDeleted: false } });
    const loser = await this.playersRepository.findOne({ where: { id: loserId, isDeleted: false } });

    // if (!tournament || !winner || !loser) {
    //   throw new BadRequestException('Tournament, winner or loser not found or deleted');
    // }

    const matchResult = this.matchResultsRepository.create({
      tournament,
      winner,
      loser,
      winnerScore,
      loserScore,
    });

    return this.matchResultsRepository.save(matchResult);
  }

  async findAll(tournamentId: number, minScore: number, page: number, limit: number, order: 'ASC' | 'DESC'): Promise<MatchResult[]> {
    return this.matchResultsRepository.find({
      where: { tournament: { id: tournamentId }, winnerScore: minScore },
      order: { winnerScore: order },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['winner', 'loser'],
    });
  }

  async findOne(id: number): Promise<MatchResult> {
    const matchResult = await this.matchResultsRepository.findOne({ where: { id, isDeleted: false }, relations: ['winner', 'loser', 'tournament'] });
    if (!matchResult) {
      throw new NotFoundException(`MatchResult with ID ${id} not found`);
    }
    return matchResult;
  }

  async update(id: number, updateMatchResultDto: UpdateMatchResultDto): Promise<MatchResult> {
    const matchResult = await this.matchResultsRepository.preload({
      id,
      ...updateMatchResultDto,
    });
    if (!matchResult) {
      throw new NotFoundException(`MatchResult with ID ${id} not found`);
    }
    return this.matchResultsRepository.save(matchResult);
  }

  async remove(id: number): Promise<void> {
    const matchResult = await this.findOne(id);
    matchResult.isDeleted = true;
    await this.matchResultsRepository.save(matchResult);
  }
}
