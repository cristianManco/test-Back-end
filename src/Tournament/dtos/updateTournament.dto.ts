import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentDto } from './createtournament.dto';



export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {}
