import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICreateActivityRepository } from 'src/activities/domain/repositories/create-activity';
import { CreateActivityDto } from '../../dto/create-activity.dto';
import { ICreateActivityOutputFactory } from '../../factories/create-activity-output-factory';
import { CreateActivityOutput } from './create-activity.output';

@Injectable()
export class CreateActivityService {
  constructor(
    @Inject('CreateActivityRepository')
    private createActivityRepository: ICreateActivityRepository,
    @Inject('CreateActivityOutputFactory')
    private createActivityOutputFactory: ICreateActivityOutputFactory,
    @Inject('BadRequestException')
    private badRequestException: BadRequestException,
  ) {}

  async execute(newTask: CreateActivityDto): Promise<CreateActivityOutput> {
    const interval =
      new Date(newTask.scheduledEnd).getTime() -
      new Date(newTask.scheduledStart).getTime();
    if (interval > 21600000)
      throw new BadRequestException(
        `Activity's duration should not exceed 6 hours`,
      );
    if (interval < 0)
      throw new BadRequestException(
        'End date and time should not be previous to start date and time',
      );
    const task = await this.createActivityRepository.create(newTask);
    return this.createActivityOutputFactory.create(task);
  }
}
