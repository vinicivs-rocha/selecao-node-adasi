import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../../domain/entities/activity.entity';
import { IEndActivityRepository } from '../../domain/repositories/end-activity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EndActivityRepository implements IEndActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}
  async end(id: string, end: string) {
    await this.activityRepository.update(id, { actualEnd: end });
  }
}
