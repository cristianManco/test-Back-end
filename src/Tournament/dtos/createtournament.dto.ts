import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateTournamentDto {
  @IsString()
  name: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  status: string;
}

