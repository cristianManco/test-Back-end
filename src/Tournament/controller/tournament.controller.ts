import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { TournamentsService } from '../service/tournament.service';
import { CreateTournamentDto, UpdateTournamentDto } from '../dtos/exportDto';
import { ApiKeyGuard } from '../../Global/GUard/x-Api-Key.guard';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post('new')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Create a new tournament' })
  @ApiResponse({ status: 201, description: 'The tournament has been successfully created.'})
  @ApiBody({ type: CreateTournamentDto })
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all tournaments' })
  @ApiResponse({ status: 200, description: 'List of tournaments'})
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tournament by ID' })
  @ApiResponse({ status: 200, description: 'The tournament has been obtained'})
  @ApiResponse({ status: 404, description: 'Tournament not found'})
  @ApiParam({ name: 'id', required: true, description: 'Tournament ID' })
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Update a tournament' })
  @ApiResponse({ status: 200, description: 'The tournament has been successfully updated.'})
  @ApiParam({ name: 'id', required: true, description: 'Tournament ID' })
  @ApiBody({ type: UpdateTournamentDto })
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Delete a tournament' })
  @ApiResponse({ status: 200, description: 'The tournament has been successfully deleted.'})
  @ApiParam({ name: 'id', required: true, description: 'Tournament ID' })
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(+id);
  }

  @Post(':id/participants')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Add participants to a tournament' })
  @ApiResponse({ status: 200, description: 'Participants have been successfully added.'})
  @ApiParam({ name: 'id', required: true, description: 'Tournament ID' })
  @ApiBody({ description: 'Player IDs', type: [Number] })
  addParticipants(@Param('id') id: string, @Body('playerIds') playerIds: number[]) {
    return this.tournamentsService.addParticipants(+id, playerIds);
  }

  @Post(':id/generate-matchups')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Generate matchups for a tournament' })
  @ApiResponse({ status: 200, description: 'Matchups have been successfully generated.'})
  @ApiParam({ name: 'id', required: true, description: 'Tournament ID' })
  generateMatchups(@Param('id') id: string) {
    return this.tournamentsService.generateMatchups(+id);
  }

  @Get(':id/results')
  @ApiOperation({ summary: 'Get match results for a tournament' })
  @ApiResponse({ status: 200, description: 'List of match results'})
  @ApiParam({ name: 'id', required: true, description: 'Tournament ID' })
  @ApiQuery({ name: 'minScore', required: false, description: 'Minimum score' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Page size limit' })
  @ApiQuery({ name: 'order', required: false, description: 'Ordering: ASC or DESC' })
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
