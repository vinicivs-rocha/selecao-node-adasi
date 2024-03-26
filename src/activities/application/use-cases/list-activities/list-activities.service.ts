import { Inject, Injectable } from '@nestjs/common';
import { IListActivitiesRepository } from 'src/activities/domain/repositories/list-activities';
import { IListActivitiesOutputFactory } from '../../factories/list-activities-output-factory';
import { ListActivitiesOutput } from './list-activities.output';

@Injectable()
export class ListActivitiesService {
  constructor(
    @Inject('ListActivitiesRepository')
    private listActivitiesRepository: IListActivitiesRepository,
    @Inject('ListActivitiesOutputFactory')
    private listActivitiesOutputFactory: IListActivitiesOutputFactory,
  ) {}

  async execute(): Promise<ListActivitiesOutput[]> {
    const activities = await this.listActivitiesRepository.list();
    return activities.map((activity) =>
      this.listActivitiesOutputFactory.create(activity),
    );
  }
}
