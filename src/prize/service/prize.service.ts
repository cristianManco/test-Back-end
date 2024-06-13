import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Prize } from '../entities/prize.entity';
import { Player } from '../../player/entities/payer.entity';
import { PlayerPrize } from '../entities/playerPrize.entity';
import { CreatePrizeDto } from '../dtos/playerPrize.dto';

@Injectable()
export class PrizesService {
  constructor(
    @InjectRepository(Prize)
    private prizesRepository: Repository<Prize>,
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @InjectRepository(PlayerPrize)
    private playerPrizesRepository: Repository<PlayerPrize>,
  ) {}

  async getRandomPrize(): Promise<Prize> {
    const prizes = await this.prizesRepository.find({ where: { quantity: MoreThan(0) } });
    if (prizes.length === 0) {
      throw new NotFoundException('No available prizes');
    }
    const randomIndex = Math.floor(Math.random() * prizes.length);
    return prizes[randomIndex];
  }

  async claimPrize(playerId: number): Promise<PlayerPrize> {
    const player = await this.playersRepository.findOne({ where: { id: playerId }, relations: ['prizes'] });
    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }

    const prize = await this.getRandomPrize();
    prize.quantity -= 1;
    await this.prizesRepository.save(prize);

    const playerPrize = this.playerPrizesRepository.create({
      player,
      prize,
      isClaimed: true,
    });

    return this.playerPrizesRepository.save(playerPrize);
  }

  async assignUnclaimedPrizes(): Promise<void> {
    const unclaimedPrizes = await this.playerPrizesRepository.find({ where: { isClaimed: false } });

    for (const playerPrize of unclaimedPrizes) {
      playerPrize.isClaimed = true;
      await this.playerPrizesRepository.save(playerPrize);
    }
  }

  async createPrize(createPrizeDto: CreatePrizeDto): Promise<Prize> {
    const prize = this.prizesRepository.create(createPrizeDto);
    return this.prizesRepository.save(prize);
  }
  
}
