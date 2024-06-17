import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrizesService } from '../service/prize.service';

@Injectable()
export class CronJobsService {
  constructor(private readonly prizesService: PrizesService) {}

  @Cron('*/2 * * * *', {
    timeZone: 'America/Bogota',
  })
  async handleCron() {
    try {
      const assignedCount = await this.prizesService.assignUnclaimedPrizes();
      console.log(
        `Cron job executed successfully. ${assignedCount} unclaimed prizes have been assigned.`,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
