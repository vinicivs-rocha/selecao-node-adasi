import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../../../courses/domain/entities/course.entity';
import { CreateStudentDto } from '../../application/dto/create-student.dto';
import { UpdateStudentDto } from '../../application/dto/update-student.dto';
import { Student } from '../../domain/entities/student.entity';
import { IStudentsCrudRepository } from '../../domain/repositories/crud';

@Injectable()
export class StudentsCrudRepository implements IStudentsCrudRepository {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = this.studentsRepository.create(createStudentDto);
    const course = await this.coursesRepository.findOne({
      where: { id: createStudentDto.courseId },
    });
    if (course === null)
      throw new NotFoundException(
        `Course with id ${createStudentDto.courseId} not found`,
      );
    newStudent.course = course;
    return this.studentsRepository.save(newStudent);
  }
  list(): Promise<Student[]> {
    return this.studentsRepository.find({ relations: ['course'] });
  }
  async find(cpf: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { cpf },
      relations: ['course'],
    });
    if (student === null)
      throw new NotFoundException(`Student with cpf ${cpf} not found`);
    return student;
  }
  async update(
    cpf: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { cpf },
      relations: ['course'],
    });
    if (student === null)
      throw new NotFoundException(`Student with cpf ${cpf} not found`);

    const updateStudent = this.studentsRepository.create(updateStudentDto);

    if (updateStudentDto.courseId) {
      const course = await this.coursesRepository.findOne({
        where: { id: updateStudentDto.courseId },
      });
      if (course === null)
        throw new NotFoundException(
          `Course with id ${updateStudentDto.courseId} not found`,
        );
      updateStudent.course = course;
    }
    await this.studentsRepository.update(cpf, updateStudent);
    return {
      ...updateStudent,
      course: updateStudent.course ?? student.course,
    };
  }
  async delete(cpf: string): Promise<string> {
    const student = await this.studentsRepository.findOne({
      where: { cpf },
    });
    if (student === null)
      throw new NotFoundException(`Student with cpf ${cpf} not found`);
    await this.studentsRepository.delete(cpf);
    return student.cpf;
  }
}
