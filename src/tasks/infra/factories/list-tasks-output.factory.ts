import { Injectable } from '@nestjs/common';
import { IListTasksOutputFactory } from 'src/tasks/application/factories/list-tasks-output-factory';
import { ListTasksOutput } from 'src/tasks/application/use-cases/list-tasks/list-tasks.output';
import { Task } from 'src/tasks/domain/entities/task.entity';

@Injectable()
export class ListTasksOutputFactory implements IListTasksOutputFactory {
  createListTasksOutput(task: Task): ListTasksOutput {
    const { id, name } = task;
    return {
      id,
      name,
    };
  }
}
