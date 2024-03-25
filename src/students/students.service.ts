import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentsRepository.save(createStudentDto);
  }

  async findAll(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  async findOne(cpf: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: {
        cpf,
      },
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
    await this.studentsRepository.update(cpf, updateStudentDto);

    return {
      ...student,
      ...updateStudentDto,
    };
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
