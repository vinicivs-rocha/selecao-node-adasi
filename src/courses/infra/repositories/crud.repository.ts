import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../../application/dto/create-course.dto';
import { UpdateCourseDto } from '../../application/dto/update-course.dto';
import { Course } from '../../domain/entities/course.entity';
import { ICoursesCrudRepository } from '../../domain/repositories/crud';

@Injectable()
export class CoursesCrudRepository implements ICoursesCrudRepository {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}
  create(courseDto: CreateCourseDto): Promise<Course> {
    return this.coursesRepository.save(courseDto);
  }
  list(): Promise<Course[]> {
    return this.coursesRepository.find();
  }
  async find(id: string): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (course === null)
      throw new NotFoundException(`Course with id ${id} not found`);
    return course;
  }
  async update(id: string, courseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (course === null)
      throw new NotFoundException(`Course with id ${id} not found`);
    await this.coursesRepository.update(id, courseDto);
    return {
      ...course,
      ...courseDto,
    };
  }
  async delete(id: string): Promise<string> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (course === null)
      throw new NotFoundException(`Course with id ${id} not found`);
    await this.coursesRepository.delete(id);
    return course.id;
  }
}
