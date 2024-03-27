export interface IDeleteActivityRepository {
  delete(id: string): Promise<boolean>;
}
