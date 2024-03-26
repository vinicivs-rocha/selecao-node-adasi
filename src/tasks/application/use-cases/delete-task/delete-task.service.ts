import { Inject, Injectable } from '@nestjs/common';
import { IDeleteTaskRepository } from 'src/tasks/domain/repositories/delete-task';
import { IDeleteTaskOutputFactory } from '../../factories/delete-task-output-factory';
import { DeleteTaskOutput } from './delete-task.output';

@Injectable()
export class DeleteTaskService {
  constructor(
    @Inject('DeleteTaskRepository')
    private deleteTaskRepository: IDeleteTaskRepository,
    @Inject('DeleteTaskOutputFactory')
    private deleteTaskOutputFactory: IDeleteTaskOutputFactory,
  ) {}

  async execute(id: string): Promise<DeleteTaskOutput> {
    const task = await this.deleteTaskRepository.delete(id);
    console.log(this.deleteTaskOutputFactory.create(task));
    return this.deleteTaskOutputFactory.create(task);
  }
}
