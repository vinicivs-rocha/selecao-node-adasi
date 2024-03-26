import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/application/dto/create-task.dto';
import { ICreateTaskRepository } from 'src/tasks/domain/repositories/create-task';
import { ICreateTaskOutputFactory } from '../../factories/create-output-factory';
import { CreateTaskOutput } from './create.output';

@Injectable()
export class CreateTaskService {
  constructor(
    @Inject('CreateTaskRepository')
    private createTaskRepository: ICreateTaskRepository,
    @Inject('CreateTaskOutputFactory')
    private createTaskOutput: ICreateTaskOutputFactory,
  ) {}

  async execute(task: CreateTaskDto): Promise<CreateTaskOutput> {
    const newTask = await this.createTaskRepository.createTask(task);
    return this.createTaskOutput.create(newTask);
  }
}
