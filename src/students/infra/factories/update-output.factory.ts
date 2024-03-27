import { Injectable } from '@nestjs/common';
import { IUpdateOutputFactory } from 'src/students/application/factories/update-output';
import { Student } from 'src/students/domain/entities/student.entity';

@Injectable()
export class UpdateOutputFactory implements IUpdateOutputFactory {
  create(updatedStudent: Student) {
    return {
      cpf: updatedStudent.cpf,
      name: updatedStudent.name,
      registration: updatedStudent.registration,
      course: {
        id: updatedStudent.course.id,
        name: updatedStudent.course.name,
      },
    };
  }
}
