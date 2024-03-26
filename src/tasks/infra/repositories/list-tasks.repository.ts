import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../domain/entities/task.entity';
import { IListTasksRepository } from '../../domain/repositories/list-tasks';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListTasksRepository implements IListTasksRepository {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  listTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }
}
