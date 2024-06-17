import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './createPlayer.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
