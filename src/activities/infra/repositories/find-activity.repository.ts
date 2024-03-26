import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../../../activities/domain/entities/activity.entity';
import { IFindActivityRepository } from '../../../activities/domain/repositories/find-activity';

@Injectable()
export class FindActivityRepository implements IFindActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async find(id: string): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['student', 'student.course', 'tasks'],
    });
    if (activity === null)
      throw new NotFoundException(`Activity with id ${id} not found`);
    return activity;
  }
}
