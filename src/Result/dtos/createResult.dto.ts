import { IsInt, IsOptional } from 'class-validator';

export class CreateResultDto {
  @IsInt()
  tournamentId: number;

  @IsInt()
  winnerId: number;

  @IsInt()
  loserId: number;

  @IsInt()
  winnerScore: number;

  @IsInt()
  loserScore: number;
}

