import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from '../../application/dto/update-task.dto';
import { Task } from '../../domain/entities/task.entity';
import { IUpdateTaskRepository } from '../../domain/repositories/update-task';

export class UpdateTaskRepository implements IUpdateTaskRepository {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async update(taskId: string, taskData: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id: taskId } });
    if (task === null)
      throw new NotFoundException(`Task with id ${taskId} not found`);
    await this.tasksRepository.update(taskId, taskData);
    return task;
  }
}
