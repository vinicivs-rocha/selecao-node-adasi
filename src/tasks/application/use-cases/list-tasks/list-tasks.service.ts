import { Inject, Injectable } from '@nestjs/common';
import { IListTasksRepository } from 'src/tasks/domain/repositories/list-tasks';
import { IListTasksOutputFactory } from '../../factories/list-tasks-output-factory';
import { ListTasksOutput } from './list-tasks.output';

@Injectable()
export class ListTasksService {
  constructor(
    @Inject('ListTasksRepository')
    private listTasksRepository: IListTasksRepository,
    @Inject('ListTasksOutputFactory')
    private listTasksOutputFactory: IListTasksOutputFactory,
  ) {}

  async execute(): Promise<ListTasksOutput[]> {
    const tasks = await this.listTasksRepository.listTasks();
    return tasks.map((task) => this.listTasksOutputFactory.create(task));
  }
}
