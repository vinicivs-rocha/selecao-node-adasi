import { Activity } from '../entities/activity.entity';

export interface IListActivitiesRepository {
  list(): Promise<Activity[]>;
}
