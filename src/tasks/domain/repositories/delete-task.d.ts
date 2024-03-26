export interface IDeleteTaskRepository {
  delete(id: string): Promise<string>;
}
