import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../../application/dto/create-task.dto';
import { Task } from '../../domain/entities/task.entity';
import { ICreateTaskRepository } from '../../domain/repositories/create-task';

@Injectable()
export class CreateTaskRepository implements ICreateTaskRepository {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  createTask(task: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.save(task);
  }
}
