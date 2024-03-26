import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../domain/entities/task.entity';
import { IDeleteTaskRepository } from '../../domain/repositories/delete-task';

export class DeleteTaskRepository implements IDeleteTaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async delete(id: string): Promise<string> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (task === null)
      throw new NotFoundException(`Task with id ${id} not found`);

    await this.taskRepository.delete(id);
    return task.id;
  }
}
