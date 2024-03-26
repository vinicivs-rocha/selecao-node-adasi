import { Activity } from 'src/activities/domain/entities/activity.entity';
import { CreateActivityOutput } from '../use-cases/create-activity/create-activity.output';

export interface ICreateActivityOutputFactory {
  create(activity: Activity): CreateActivityOutput;
}
