export interface IFindTaskRepository {
  find(id: string): Promise<Task>;
}
