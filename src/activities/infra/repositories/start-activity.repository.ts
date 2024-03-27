import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../../domain/entities/activity.entity';
import { IStartActivityRepository } from '../../domain/repositories/start-activity';

@Injectable()
export class StartActivityRepository implements IStartActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async start(id: string, start: string) {
    await this.activityRepository.update(id, { actualStart: start });
  }
}
