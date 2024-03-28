import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsDateString({ strict: true })
  date: string;

  @IsString()
  @IsDateString({ strict: true })
  scheduledStart: string;

  @IsString()
  @IsDateString({ strict: true })
  scheduledEnd: string;

  @IsString()
  @Matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/)
  @ApiProperty({ pattern: '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$' })
  studentCpf: string;

  @IsArray()
  @IsString({ each: true })
  @IsUUID('all', { each: true })
  @ArrayMinSize(1)
  taskIds: string[];
}
