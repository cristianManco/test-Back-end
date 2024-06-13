import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrizesService } from '../service/prize.service';

@Injectable()
export class CronJobsService {
  constructor(private readonly prizesService: PrizesService) {}

  @Cron('59 23 * * *', {
    timeZone: 'America/Bogota',
  })
  async handleCron() {
    await this.prizesService.assignUnclaimedPrizes();
  }
}
