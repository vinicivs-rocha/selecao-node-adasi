import { Injectable } from '@nestjs/common';
import { ICreateActivityOutputFactory } from 'src/activities/application/factories/create-activity-output-factory';
import { CreateActivityOutput } from '../../../activities/application/use-cases/create-activity/create-activity.output';
import { Activity } from '../../../activities/domain/entities/activity.entity';

@Injectable()
export class CreateActivityOutputFactory
  implements ICreateActivityOutputFactory
{
  create(activity: Activity): CreateActivityOutput {
    const { id, date, scheduledEnd, scheduledStart, student, tasks } = activity;
    return {
      id,
      date,
      scheduledEnd: scheduledEnd,
      scheduledStart: scheduledStart,
      studentCpf: student.cpf,
      taskIds: tasks.map((task) => task.id),
    };
  }
}
