import { IDeleteTaskOutputFactory } from 'src/tasks/application/factories/delete-task-output-factory';
import { DeleteTaskOutput } from 'src/tasks/application/use-cases/delete-task/delete-task.output';

export class DeleteTaskOutputFactory implements IDeleteTaskOutputFactory {
  create(id: string): DeleteTaskOutput {
    return {
      id,
    };
  }
}
