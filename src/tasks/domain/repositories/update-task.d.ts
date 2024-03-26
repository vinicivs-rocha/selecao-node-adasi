import { UpdateTaskDto } from 'src/tasks/application/dto/update-task.dto';

export interface IUpdateTaskRepository {
  update(taskId: string, taskData: UpdateTaskDto): Promise<Task>;
}
