import { Controller, Post, Param, Body } from '@nestjs/common';
import { PrizesService } from '../service/prize.service';
import { CreatePrizeDto } from '../dtos/playerPrize.dto';

@Controller('prizes')
export class PrizesController {
  constructor(private readonly prizesService: PrizesService) {}

  @Post('claim/:playerId')
  claimPrize(@Param('playerId') playerId: number) {
    return this.prizesService.claimPrize(playerId);
  }

  @Post('new')
  createPrize(@Body() createPrizeDto: CreatePrizeDto) {
    return this.prizesService.createPrize(createPrizeDto);
  }
}
