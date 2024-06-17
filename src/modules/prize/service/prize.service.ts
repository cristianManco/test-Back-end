import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
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
    try {
      const prizes = await this.prizesRepository.find({
        where: { quantity: MoreThan(0) },
      });
      if (prizes.length === 0) {
        throw new NotFoundException('No available prizes');
      }
      const randomIndex = Math.floor(Math.random() * prizes.length);
      return prizes[randomIndex];
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving random prize',
        error.message,
      );
    }
  }

  async claimPrize(playerId: number): Promise<PlayerPrize> {
    try {
      const player = await this.playersRepository.findOne({
        where: { id: playerId },
        relations: ['prizes'],
      });
      if (!player) {
        throw new NotFoundException(`Player with ID ${playerId} not found`);
      }

      if (player.isDeleted) {
        throw new ForbiddenException(
          'This player is not allowed to claim prizes.',
        );
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Error claiming prize',
        error.message,
      );
    }
  }

  async assignUnclaimedPrizes(): Promise<number> {
    try {
      const unclaimedPrizes = await this.playerPrizesRepository.find({
        where: { isClaimed: false },
      });
      console.log(`Found ${unclaimedPrizes.length} unclaimed prizes`);

      for (const playerPrize of unclaimedPrizes) {
        playerPrize.isClaimed = true;
        await this.playerPrizesRepository.save(playerPrize);
      }

      console.log(
        `${unclaimedPrizes.length} unclaimed prizes have been assigned.`,
      );
      return unclaimedPrizes.length;
    } catch (error) {
      console.error('Error assigning unclaimed prizes:', error);
      throw new InternalServerErrorException(
        'Could not assign unclaimed prizes',
      );
    }
  }

  async createPrize(createPrizeDto: CreatePrizeDto): Promise<Prize> {
    try {
      const prize = this.prizesRepository.create(createPrizeDto);
      return this.prizesRepository.save(prize);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating prize',
        error.message,
      );
    }
  }
}
