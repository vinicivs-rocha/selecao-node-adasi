import { UpdateTaskOutput } from '../use-cases/update-task/update-task.output';

export interface IUpdateTaskOutputFactory {
  create(task: Task): UpdateTaskOutput;
}
