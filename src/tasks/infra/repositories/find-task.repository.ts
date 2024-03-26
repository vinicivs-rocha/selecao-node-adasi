import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../domain/entities/task.entity';
import { IFindTaskRepository } from '../../domain/repositories/find-task';

@Injectable()
export class FindTaskRepository implements IFindTaskRepository {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async find(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (task === null)
      throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }
}
