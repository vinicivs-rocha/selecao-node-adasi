import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IFindActivityRepository } from 'src/activities/domain/repositories/find-activity';
import { IStartActivityRepository } from 'src/activities/domain/repositories/start-activity';
import { StartActivityDto } from '../../dto/start-activity.dto';
import { IStartActivityOutputFactory } from '../../factories/start-activity-output-factory';

@Injectable()
export class StartActivityService {
  constructor(
    @Inject('FindActivityRepository')
    private findActivityRepository: IFindActivityRepository,
    @Inject('StartActivityRepository')
    private startActivityRepository: IStartActivityRepository,
    @Inject('StartActivityOutputFactory')
    private startActivityOutputFactory: IStartActivityOutputFactory,
  ) {}

  async execute(id: string, startDto: StartActivityDto) {
    const activity = await this.findActivityRepository.find(id);
    const startDifference =
      new Date(startDto.start).getTime() -
      new Date(activity.scheduledStart).getTime();
    console.log(
      startDifference,
      new Date(startDto.start).getTime(),
      new Date(activity.scheduledStart).getTime(),
      activity.scheduledStart,
    );
    if (startDifference < -900_000 || startDifference > 900_000)
      throw new BadRequestException(
        'The start time must have a maximum of 15 minutes difference from the scheduled start time',
      );
    await this.startActivityRepository.start(id, startDto.start);
    return this.startActivityOutputFactory.create(startDto.start);
  }
}
