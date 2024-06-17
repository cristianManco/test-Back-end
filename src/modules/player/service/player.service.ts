import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/payer.entity';
import { CreatePlayerDto, UpdatePlayerDto } from '../dtos/exportDto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    1;
    try {
      const player = this.playersRepository.create(createPlayerDto);
      return this.playersRepository.save(player);
    } catch (error) {
      throw new HttpException(
        `Failed to create player: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Player[]> {
    try {
      return this.playersRepository.find({ where: { isDeleted: false } });
    } catch (error) {
      throw new HttpException(
        `Failed to find player: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Player> {
    try {
      const player = await this.playersRepository.findOne({
        where: { id, isDeleted: false },
      });
      if (!player) {
        throw new NotFoundException(`Player with ID ${id} not found`);
      }
      return player;
    } catch (error) {
      throw new HttpException(
        `Failed to find player byId: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    try {
      const player = await this.playersRepository.preload({
        id,
        ...updatePlayerDto,
      });
      if (!player) {
        throw new NotFoundException(`Player with ID ${id} not found`);
      }
      return this.playersRepository.save(player);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const player = await this.findOne(id);
      player.isDeleted = true;
      await this.playersRepository.save(player);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
