export interface IEndActivityRepository {
  end(id: string, end: string): Promise<void>;
}
