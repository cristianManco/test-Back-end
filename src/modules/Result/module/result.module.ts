import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchResult } from '../entities/resul.entity';
import { Player } from 'src/modules/player/entities/payer.entity';
import { PlayerModule } from 'src/modules/player/module/player.module';
import { ResultController } from '../controller/result.controller';
import { ResultService } from '../service/result.service';
import { Tournament } from 'src/modules/Tournament/entities/tournament.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MatchResult, Player, Tournament]),
    PlayerModule,
  ],
  exports: [TypeOrmModule],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
