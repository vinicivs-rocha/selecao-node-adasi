import { Inject, Injectable } from '@nestjs/common';
import { IFindActivityRepository } from 'src/activities/domain/repositories/find-activity';
import { FindActivityOutput } from './find-activity.output';
import { IFindActivityOutputFactory } from '../../factories/find-activities-output-factory';

@Injectable()
export class FindActivityService {
  constructor(
    @Inject('FindActivityRepository')
    private findActivityRepository: IFindActivityRepository,
    @Inject('FindActivityOutputFactory')
    private findActivityOutputFactory: IFindActivityOutputFactory,
  ) {}

  async execute(id: string): Promise<FindActivityOutput> {
    const activity = await this.findActivityRepository.find(id);
    return this.findActivityOutputFactory.create(activity);
  }
}
