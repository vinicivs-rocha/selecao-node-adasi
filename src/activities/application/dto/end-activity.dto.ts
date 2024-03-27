import { IsDateString, IsString } from 'class-validator';

export class EndActivityDto {
  @IsString()
  @IsDateString({ strict: true })
  end: string;
}
