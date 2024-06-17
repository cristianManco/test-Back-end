import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrizesService } from '../service/prize.service';
import { PrizesController } from '../controller/prize.controller';
import { Prize } from '../entities/prize.entity';
import { PlayerPrize } from '../entities/playerPrize.entity';
import { Player } from '../../player/entities/payer.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobsService } from '../service/cron-jobs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prize, Player, PlayerPrize]),
    ScheduleModule,
  ],
  exports: [TypeOrmModule],
  providers: [PrizesService, CronJobsService],
  controllers: [PrizesController],
})
export class PrizesModule {}
