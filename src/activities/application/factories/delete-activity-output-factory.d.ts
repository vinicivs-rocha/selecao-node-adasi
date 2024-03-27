import { DeleteActivityOutput } from '../use-cases/delete-activity/delete-activity.output';

export interface IDeleteActivityOutputFactory {
  create(id: string): DeleteActivityOutput;
}
