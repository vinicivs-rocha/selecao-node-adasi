import { Inject, Injectable } from '@nestjs/common';
import { ICoursesCrudRepository } from 'src/courses/domain/repositories/crud';
import { Course } from '../../../domain/entities/course.entity';
import { CreateCourseDto } from '../../dto/create-course.dto';
import { UpdateCourseDto } from '../../dto/update-course.dto';
import { IRemoveOutputFactory } from '../../factories/remove-output';
import { RemoveOutput } from './remove.output';

@Injectable()
export class CrudService {
  constructor(
    @Inject('CoursesCrudRepository')
    private crudRepository: ICoursesCrudRepository,
    @Inject('RemoveOutputFactory')
    private removeOutputFactory: IRemoveOutputFactory,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.crudRepository.create(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return this.crudRepository.list();
  }

  async findOne(id: string): Promise<Course> {
    return this.crudRepository.find(id);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.crudRepository.update(id, updateCourseDto);
  }

  async remove(id: string): Promise<RemoveOutput> {
    const deletedId = await this.crudRepository.delete(id);
    return this.removeOutputFactory.create(deletedId);
  }
}
