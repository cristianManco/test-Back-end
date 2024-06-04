import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/player/entities/payer.entity';
import { MatchResult } from 'src/Result/entities/resul.entity';
import { Tournament } from '../entities/tournament.entity';
import { PlayerModule } from 'src/player/module/player.module';
import { ResultModule } from 'src/Result/module/result.module';
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
