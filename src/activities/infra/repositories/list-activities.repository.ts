import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../../../activities/domain/entities/activity.entity';
import { IListActivitiesRepository } from '../../../activities/domain/repositories/list-activities';

export class ListActivitiesRepository implements IListActivitiesRepository {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  async list(): Promise<Activity[]> {
    return this.activitiesRepository.find({
      relations: ['student', 'student.course', 'tasks'],
    });
  }
}
