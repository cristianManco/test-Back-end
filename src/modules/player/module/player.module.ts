import { Module } from '@nestjs/common';
import { Player } from '../entities/payer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersController } from '../controller/player.controller';
import { PlayersService } from '../service/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  exports: [TypeOrmModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayerModule {}
