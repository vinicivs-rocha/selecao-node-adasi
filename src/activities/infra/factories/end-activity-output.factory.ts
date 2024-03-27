import { Injectable } from '@nestjs/common';
import { IEndActivityOutputFactory } from 'src/activities/application/factories/end-activity-output-factory';
import { EndActivityOutput } from 'src/activities/application/use-cases/end-activity/end-activity.output';

@Injectable()
export class EndActivityOutputFactory implements IEndActivityOutputFactory {
  create(endTime: string): EndActivityOutput {
    return { endTime };
  }
}
