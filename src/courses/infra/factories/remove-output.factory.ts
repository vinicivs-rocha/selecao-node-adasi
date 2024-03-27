import { Injectable } from '@nestjs/common';
import { IRemoveOutputFactory } from 'src/courses/application/factories/remove-output';
import { RemoveOutput } from 'src/courses/application/use-cases/crud/remove.output';

@Injectable()
export class RemoveOutputFactory implements IRemoveOutputFactory {
  create(id: string): RemoveOutput {
    return { id };
  }
}
