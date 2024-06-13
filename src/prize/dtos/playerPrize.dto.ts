import { IsString, IsInt, Min } from 'class-validator';

export class CreatePrizeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
