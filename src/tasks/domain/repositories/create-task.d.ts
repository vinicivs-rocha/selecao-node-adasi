import { CreateTaskDto } from '../../application/dto/create-task.dto';

export interface ICreateTaskRepository {
  createTask(task: CreateTaskDto): Promise<Task>;
}
