import { CreateActivityDto } from 'src/activities/application/dto/create-activity.dto';

export interface ICreateActivityRepository {
  create(task: CreateActivityDto): Promise<Task>;
}
