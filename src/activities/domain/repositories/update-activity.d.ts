export interface IUpdateActivityRepository {
  update(id: string, dto: UpdateActivityDto): Promise<Activity>;
}
