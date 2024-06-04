import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PlayersService } from '../service/player.service';
import { CreatePlayerDto, UpdatePlayerDto } from '../dtos/exportDto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('new')
  @ApiOperation({ summary: 'Crear un nuevo jugador' })
  @ApiResponse({ status: 201, description: 'The player has been successfully created.'})
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, description: 'Players list'})
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get player by ID' })
  @ApiResponse({ status: 200, description: 'The player has been obtained'})
  @ApiResponse({ status: 404, description: 'Player not found'})
  @ApiParam({ name: 'id', required: true, description: 'Player ID' })
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a player' })
  @ApiResponse({ status: 200, description: 'The player has been successfully updated.'})
  @ApiParam({ name: 'id', required: true, description: 'Player ID' })
  @ApiBody({ type: UpdatePlayerDto })
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a player' })
  @ApiResponse({ status: 200, description: 'The player has been successfully deleted.'})
  @ApiParam({ name: 'id', required: true, description: 'Player ID' })
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
