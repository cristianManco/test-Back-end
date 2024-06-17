import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateResultDto {
  @ApiProperty()
  @IsInt()
  tournamentId: number;

  @ApiProperty()
  @IsInt()
  winnerId: number;

  @ApiProperty()
  @IsInt()
  loserId: number;

  @ApiProperty()
  @IsInt()
  winnerScore: number;

  @ApiProperty()
  @IsInt()
  loserScore: number;
}
