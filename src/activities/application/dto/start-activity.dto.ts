import { IsDateString, IsString } from 'class-validator';

export class StartActivityDto {
  @IsString()
  @IsDateString({ strict: true })
  start: string;
}
