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
  @Matches(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})([+-]\d{2})?$/)
  scheduledStart: string;

  @IsString()
  @Matches(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})([+-]\d{2})?$/)
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
