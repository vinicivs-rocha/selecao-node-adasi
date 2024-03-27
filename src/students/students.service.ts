import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentsRepository: Repository<Student>,
    @InjectRepository(Course) private coursesRepository: Repository<Course>,
  ) {}

  async create({ course_id, ...dto }: CreateStudentDto): Promise<Student> {
    const course = await this.coursesRepository.findOne({
      where: {
        id: course_id,
      },
      relations: ['students'],
    });

    if (course === null)
      throw new NotFoundException(`Course with id ${course_id} not found`);

    const student = new Student();
    student.cpf = dto.cpf;
    student.name = dto.name;
    student.registration = dto.registration;
    student.course = course;

    return await this.studentsRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentsRepository.find({
      relations: ['course'],
    });
  }

  async findOne(cpf: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: {
        cpf,
      },
      relations: ['course'],
    });
    if (student === null) {
      throw new NotFoundException(`Student with cpf ${cpf} not found`);
    }
    return student;
  }

  async update(
    cpf: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({ cpf });
    if (student === null)
      throw new NotFoundException(`Student with cpf ${cpf} does not exists`);

    const updatedStudent = new Student();
    updatedStudent.cpf = updateStudentDto.cpf ?? student.cpf;
    updatedStudent.name = updateStudentDto.name ?? student.name;
    updatedStudent.registration =
      updateStudentDto.registration ?? student.registration;
    if (updateStudentDto.course_id) {
      const course = await this.coursesRepository.findOne({
        where: {
          id: updateStudentDto.course_id,
        },
      });
      if (course === null)
        throw new NotFoundException(
          `Course with id ${updateStudentDto.course_id} not found`,
        );
      updatedStudent.course = course;
    }
    await this.studentsRepository.update(cpf, updatedStudent);

    return (await this.studentsRepository.findOne({
      where: { cpf },
      relations: ['course'],
    })) as Student;
  }

  async remove(cpf: string): Promise<{ cpf: string }> {
    const student = await this.studentsRepository.findOneBy({ cpf });
    if (student === null)
      throw new NotFoundException(`Student with cpf ${cpf} does not exists`);
    await this.studentsRepository.delete(cpf);
    return {
      cpf,
    };
  }
}
