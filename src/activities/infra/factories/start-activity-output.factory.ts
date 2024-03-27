import { Injectable } from '@nestjs/common';
import { IStartActivityOutputFactory } from 'src/activities/application/factories/start-activity-output-factory';
import { StartActivityOutput } from 'src/activities/application/use-cases/start-activity/start-activity.output';

@Injectable()
export class StartActivityOutputFactory implements IStartActivityOutputFactory {
  create(startTime: string): StartActivityOutput {
    return {
      startTime,
    };
  }
}
