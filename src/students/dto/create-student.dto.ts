import { IsString, IsUUID, Matches } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @Matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/)
  cpf: string;

  @IsString()
  name: string;

  @IsString()
  registration: string;

  @IsUUID()
  course_id: string;
}
