import { Injectable } from '@nestjs/common';
import { ICreateTaskOutputFactory } from 'src/tasks/application/factories/create-output-factory';
import { CreateTaskOutput } from 'src/tasks/application/use-cases/create-task/create.output';
import { Task } from 'src/tasks/domain/entities/task.entity';

@Injectable()
export class CreateTaskOutputFactory implements ICreateTaskOutputFactory {
  create(task: Task): CreateTaskOutput {
    const { id, name } = task;
    return {
      id,
      name,
    };
  }
}
