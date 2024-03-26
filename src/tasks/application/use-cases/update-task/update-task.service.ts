import { Inject, Injectable } from '@nestjs/common';
import { IUpdateTaskRepository } from 'src/tasks/domain/repositories/update-task';
import { UpdateTaskDto } from '../../dto/update-task.dto';
import { IUpdateTaskOutputFactory } from '../../factories/update-task-output-factory';
import { UpdateTaskOutput } from './update-task.output';

@Injectable()
export class UpdateTaskService {
  constructor(
    @Inject('UpdateTaskRepository')
    private updateTaskRepository: IUpdateTaskRepository,
    @Inject('UpdateTaskOutputFactory')
    private updateTaskOutputFactory: IUpdateTaskOutputFactory,
  ) {}

  async execute(
    taskId: string,
    taskData: UpdateTaskDto,
  ): Promise<UpdateTaskOutput> {
    const task = await this.updateTaskRepository.update(taskId, taskData);
    return this.updateTaskOutputFactory.create({ ...task, ...taskData });
  }
}
