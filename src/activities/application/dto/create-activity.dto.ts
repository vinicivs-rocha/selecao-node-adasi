import {
  ArrayMinSize,
  IsArray,
  IsISO8601,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsISO8601({ strict: true })
  date: string;

  @IsString()
  @IsISO8601({ strict: true })
  scheduledStart: string;

  @IsString()
  @IsISO8601({ strict: true })
  scheduledEnd: string;

  @IsString()
  @Matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/)
  studentCpf: string;

  @IsArray()
  @IsString({ each: true })
  @IsUUID('all', { each: true })
  @ArrayMinSize(1)
  taskIds: string[];
}
