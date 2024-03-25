import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.coursesRepository.save(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: {
        id,
      },
    });
    if (course === null) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesRepository.findOneBy({ id });
    if (course === null)
      throw new NotFoundException(`Course with id ${id} does not exists`);
    const updated = await this.coursesRepository.update(id, updateCourseDto);
    if (updated.affected === 1) {
      return {
        ...course,
        ...updateCourseDto,
      };
    }
  }

  async remove(id: string) {
    try {
      return await this.coursesRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(`Course with id ${id} does not exists`);
    }
  }
}
