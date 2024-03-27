import { IDeleteActivityOutputFactory } from 'src/activities/application/factories/delete-activity-output-factory';
import { DeleteActivityOutput } from 'src/activities/application/use-cases/delete-activity/delete-activity.output';

export class DeleteActivityOutputFactory
  implements IDeleteActivityOutputFactory
{
  create(id: string): DeleteActivityOutput {
    return {
      id,
    };
  }
}
