import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IEndActivityRepository } from 'src/activities/domain/repositories/end-activity';
import { IFindActivityRepository } from 'src/activities/domain/repositories/find-activity';
import { IEndActivityOutputFactory } from '../../factories/end-activity-output-factory';
import { EndActivityOutput } from './end-activity.output';
import { EndActivityDto } from '../../dto/end-activity.dto';

@Injectable()
export class EndActivityService {
  constructor(
    @Inject('FindActivityRepository')
    private findActivityRepository: IFindActivityRepository,
    @Inject('EndActivityRepository')
    private endActivityRepository: IEndActivityRepository,
    @Inject('EndActivityOutputFactory')
    private endActivityOutputFactory: IEndActivityOutputFactory,
  ) {}

  async execute(
    id: string,
    endDto: EndActivityDto,
  ): Promise<EndActivityOutput> {
    const activity = await this.findActivityRepository.find(id);
    if (!activity.actualStart)
      throw new BadRequestException('The activity has not started yet');

    const actualStartTime = new Date(activity.actualStart).getTime();
    const endTime = new Date(endDto.end).getTime();
    if (actualStartTime > endTime)
      throw new BadRequestException('The end time must not preceed start time');

    await this.endActivityRepository.end(id, endDto.end);
    return this.endActivityOutputFactory.create(endDto.end);
  }
}
