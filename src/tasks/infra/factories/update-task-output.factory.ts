import { IUpdateTaskOutputFactory } from 'src/tasks/application/factories/update-task-output-factory';
import { UpdateTaskOutput } from 'src/tasks/application/use-cases/update-task/update-task.output';
import { Task } from 'src/tasks/domain/entities/task.entity';

export class UpdateTaskOutputFactory implements IUpdateTaskOutputFactory {
  create(task: Task): UpdateTaskOutput {
    const { id, name } = task;
    return {
      id,
      name,
    };
  }
}
