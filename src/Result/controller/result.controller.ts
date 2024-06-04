import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ResultService } from '../service/result.service';
import { CreateResultDto, UpdateMatchResultDto } from '../dtos/exportDto';
import { ApiOperation, ApiParam, ApiResponse, ApiQuery, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('results')
@Controller('results')
export class ResultController {
  constructor(private readonly matchResultsService: ResultService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new match result' })
  @ApiResponse({ status: 201, description: 'The match result has been successfully created.'})
  @ApiBody({ type: CreateResultDto })
  create(@Body() createMatchResultDto: CreateResultDto) {
    return this.matchResultsService.create(createMatchResultDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all match results' })
  @ApiResponse({ status: 200, description: 'List of match results'})
  @ApiQuery({ name: 'tournamentId', required: false, description: 'Tournament ID' })
  @ApiQuery({ name: 'minScore', required: false, description: 'Minimum score' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Page size limit' })
  @ApiQuery({ name: 'order', required: false, description: 'Ordering: ASC or DESC' })
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
  @ApiOperation({ summary: 'Get match result by ID' })
  @ApiResponse({ status: 200, description: 'The match result has been obtained'})
  @ApiResponse({ status: 404, description: 'Match result not found'})
  @ApiParam({ name: 'id', required: true, description: 'Match result ID' })
  findOne(@Param('id') id: string) {
    return this.matchResultsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a match result' })
  @ApiResponse({ status: 200, description: 'The match result has been successfully updated.'})
  @ApiParam({ name: 'id', required: true, description: 'Match result ID' })
  @ApiBody({ type: UpdateMatchResultDto })
  update(@Param('id') id: string, @Body() updateMatchResultDto: UpdateMatchResultDto) {
    return this.matchResultsService.update(+id, updateMatchResultDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a match result' })
  @ApiResponse({ status: 200, description: 'The match result has been successfully deleted.'})
  @ApiParam({ name: 'id', required: true, description: 'Match result ID' })
  remove(@Param('id') id: string) {
    return this.matchResultsService.remove(+id);
  }
}
