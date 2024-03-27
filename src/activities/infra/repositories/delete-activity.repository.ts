import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../../domain/entities/activity.entity';
import { IDeleteActivityRepository } from '../../domain/repositories/delete-activity';

@Injectable()
export class DeleteActivityRepository implements IDeleteActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}
  async delete(id: string): Promise<boolean> {
    const activity = await this.activitiesRepository.findOne({ where: { id } });
    if (activity === null)
      throw new NotFoundException(`Activity with id ${id} not found`);
    const result = await this.activitiesRepository.delete(id);
    return result.affected === 1;
  }
}
