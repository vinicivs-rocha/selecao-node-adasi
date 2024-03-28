import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Matches } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @Matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/)
  @ApiProperty({ pattern: '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$' })
  cpf: string;

  @IsString()
  name: string;

  @IsString()
  registration: string;

  @IsUUID()
  courseId: string;
}
