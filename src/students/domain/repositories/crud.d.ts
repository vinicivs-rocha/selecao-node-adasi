import { CreateStudentDto } from 'src/students/application/dto/create-student.dto';
import { UpdateStudentDto } from 'src/students/application/dto/update-student.dto';
import { Student } from '../entities/student.entity';

export interface IStudentsCrudRepository {
  create(createStudentDto: CreateStudentDto): Promise<Student>;
  list(): Promise<Student[]>;
  find(cpf: string): Promise<Student>;
  update(cpf: string, updateStudentDto: UpdateStudentDto): Promise<Student>;
  delete(cpf: string): Promise<string>;
}
