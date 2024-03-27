import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../../domain/entities/activity.entity';
import { IStartActivityRepository } from '../../domain/repositories/start-activity';

export class StartActivityRepository implements IStartActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async start(id: string, start: string) {
    const activity = (await this.activityRepository.findOne({
      where: { id },
    })) as Activity;
    activity.actualStart = start;
    await this.activityRepository.save(activity);
  }
}
