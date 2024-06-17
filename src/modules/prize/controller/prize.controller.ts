import {
  Controller,
  Post,
  Param,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrizesService } from '../service/prize.service';
import { CreatePrizeDto } from '../dtos/playerPrize.dto';

@Controller('prizes')
export class PrizesController {
  constructor(private readonly prizesService: PrizesService) {}

  @Post('claim/:playerId')
  async claimPrize(@Param('playerId') playerId: number) {
    try {
      const result = await this.prizesService.claimPrize(playerId);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('new')
  async createPrize(@Body() createPrizeDto: CreatePrizeDto) {
    try {
      const result = await this.prizesService.createPrize(createPrizeDto);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('test-cron')
  async testCron() {
    try {
      const assignedCount = await this.prizesService.assignUnclaimedPrizes();
      return {
        message: `Cron job executed successfully. ${assignedCount} unclaimed prizes have been assigned.`,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
