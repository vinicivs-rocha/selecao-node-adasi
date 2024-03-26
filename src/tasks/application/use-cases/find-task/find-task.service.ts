import { Inject, Injectable } from '@nestjs/common';
import { IFindTaskRepository } from 'src/tasks/domain/repositories/find-task';
import { IFindTaskOutputFactory } from '../../factories/find-task-output-factory';
import { FindTaskOutput } from './find-task.output';

@Injectable()
export class FindTaskService {
  constructor(
    @Inject('FindTaskRepository')
    private findTaskRepository: IFindTaskRepository,
    @Inject('FindTaskOutputFactory')
    private findTaskOutputFactory: IFindTaskOutputFactory,
  ) {}

  async execute(id: string): Promise<FindTaskOutput> {
    const task = await this.findTaskRepository.find(id);

    return this.findTaskOutputFactory.create(task);
  }
}
