import { Inject, Injectable } from '@nestjs/common';
import { IDeleteActivityRepository } from 'src/activities/domain/repositories/delete-activity';
import { DeleteActivityOutput } from './delete-activity.output';
import { IDeleteActivityOutputFactory } from '../../factories/delete-activity-output-factory';

@Injectable()
export class DeleteActivityService {
  constructor(
    @Inject('DeleteActivityRepository')
    private deleteActivityRepository: IDeleteActivityRepository,
    @Inject('DeleteActivityOutputFactory')
    private deleteActivityOutputFactory: IDeleteActivityOutputFactory,
  ) {}

  async execute(id: string): Promise<DeleteActivityOutput> {
    await this.deleteActivityRepository.delete(id);
    return this.deleteActivityOutputFactory.create(id);
  }
}
