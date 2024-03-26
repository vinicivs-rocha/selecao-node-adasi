import { Activity } from '../entities/activity.entity';

export interface IFindActivityRepository {
  find(id: string): Promise<Activity>;
}
