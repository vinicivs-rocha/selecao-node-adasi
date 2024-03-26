export interface IListTasksRepository {
  listTasks(): Promise<Task[]>;
}
