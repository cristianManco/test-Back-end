import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { TournamentsService } from '../service/tournament.service';
import { CreateTournamentDto, UpdateTournamentDto } from '../dtos/exportDto';
// import { ApiKeyGuard } from './guards/api-key.guard';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
//   @UseGuards(ApiKeyGuard)
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Get()
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @Put(':id')
//   @UseGuards(ApiKeyGuard)
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @Delete(':id')
//   @UseGuards(ApiKeyGuard)
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(+id);
  }

  @Post(':id/participants')
//   @UseGuards(ApiKeyGuard)
  addParticipants(@Param('id') id: string, @Body('playerIds') playerIds: number[]) {
    return this.tournamentsService.addParticipants(+id, playerIds);
  }

  @Post(':id/generate-matchups')
//   @UseGuards(ApiKeyGuard)
  generateMatchups(@Param('id') id: string) {
    return this.tournamentsService.generateMatchups(+id);
  }

  @Get(':id/results')
  getMatchResults(
    @Param('id') id: string,
    @Query('minScore') minScore: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('order') order: 'ASC' | 'DESC',
  ) {
    return this.tournamentsService.getMatchResults(+id, minScore, page, limit, order);
  }
}
