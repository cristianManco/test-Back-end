
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ResultService } from '../service/result.service';
import { CreateResultDto, UpdateMatchResultDto } from '../dtos/exportDto';

@Controller('results')
export class ResultController {
  constructor(private readonly matchResultsService: ResultService) {}

  @Post()
  create(@Body() createMatchResultDto: CreateResultDto) {
    return this.matchResultsService.create(createMatchResultDto);
  }

  @Get()
  findAll(
    @Query('tournamentId') tournamentId: number,
    @Query('minScore') minScore: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('order') order: 'ASC' | 'DESC',
  ) {
    return this.matchResultsService.findAll(tournamentId, minScore, page, limit, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchResultsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMatchResultDto: UpdateMatchResultDto) {
    return this.matchResultsService.update(+id, updateMatchResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchResultsService.remove(+id);
  }
}
