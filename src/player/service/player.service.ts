import { Injectable, NotFoundException } from '@nestjs/common';
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
    const player = this.playersRepository.create(createPlayerDto);
    return this.playersRepository.save(player);
  }

  async findAll(): Promise<Player[]> {
    return this.playersRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.playersRepository.findOne({ where: { id, isDeleted: false } });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.playersRepository.preload({
      id,
      ...updatePlayerDto,
    });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return this.playersRepository.save(player);
  }

  async remove(id: number): Promise<void> {
    const player = await this.findOne(id);
    player.isDeleted = true;
    await this.playersRepository.save(player);
  }
}
