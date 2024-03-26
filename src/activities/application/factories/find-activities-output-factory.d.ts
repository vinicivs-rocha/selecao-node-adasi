import { Activity } from 'src/activities/domain/entities/activity.entity';
import { FindActivityOutput } from '../use-cases/find-activity/find-activity.output';

export interface IFindActivityOutputFactory {
  create(activity: Activity): FindActivityOutput;
}
