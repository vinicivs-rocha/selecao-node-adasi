import { Student } from 'src/students/domain/entities/student.entity';

export interface IUpdateOutputFactory {
  create(updatedStudent: Student): UpdateOutput;
}
