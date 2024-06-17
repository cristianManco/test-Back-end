import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/modules/player/entities/payer.entity';
import { MatchResult } from 'src/modules/Result/entities/resul.entity';
import { Tournament } from '../entities/tournament.entity';
import { PlayerModule } from 'src/modules/player/module/player.module';
import { ResultModule } from 'src/modules/Result/module/result.module';
import { TournamentsController } from '../controller/tournament.controller';
import { TournamentsService } from '../service/tournament.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, Player, MatchResult]),
    PlayerModule,
    ResultModule,
  ],
  exports: [TypeOrmModule],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentModule {}
