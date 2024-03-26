import { Injectable } from '@nestjs/common';
import { IFindTaskOutputFactory } from 'src/tasks/application/factories/find-task-output-factory';
import { FindTaskOutput } from 'src/tasks/application/use-cases/find-task/find-task.output';
import { Task } from 'src/tasks/domain/entities/task.entity';

@Injectable()
export class FindTaskOutputFactory implements IFindTaskOutputFactory {
  create(task: Task): FindTaskOutput {
    const { id, name } = task;
    return {
      id,
      name,
    };
  }
}
