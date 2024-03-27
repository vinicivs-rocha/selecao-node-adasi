import { Injectable } from '@nestjs/common';
import { IStartActivityOutputFactory } from 'src/activities/application/factories/start-activity-output-factory';

@Injectable()
export class StartActivityOutputFactory implements IStartActivityOutputFactory {
  create(start: string) {
    return {
      start,
    };
  }
}
