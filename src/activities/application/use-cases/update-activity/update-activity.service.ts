import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUpdateActivityRepository } from 'src/activities/domain/repositories/update-activity';
import { UpdateActivityDto } from '../../dto/update-activity.dto';
import { IUpdateActivityOutputFactory } from '../../factories/update-activity-output-factory';
import { UpdateActivityOutput } from './update-activity.output';

@Injectable()
export class UpdateActivityService {
  constructor(
    @Inject('UpdateActivityRepository')
    private updateActivityRepository: IUpdateActivityRepository,
    @Inject('UpdateActivityOutputFactory')
    private updateActivityOutputFactory: IUpdateActivityOutputFactory,
  ) {}

  async execute(
    id: string,
    dto: UpdateActivityDto,
  ): Promise<UpdateActivityOutput> {
    if (dto.scheduledStart !== undefined && dto.scheduledEnd !== undefined) {
      const interval =
        new Date(dto.scheduledEnd).getTime() -
        new Date(dto.scheduledStart).getTime();
      if (interval > 21600000)
        throw new BadRequestException(
          `Activity's duration should not exceed 6 hours`,
        );
      if (interval < 0)
        throw new BadRequestException(
          'End date and time should not be previous to start date and time',
        );
    }
    const activity = await this.updateActivityRepository.update(id, dto);
    return this.updateActivityOutputFactory.create(activity);
  }
}
