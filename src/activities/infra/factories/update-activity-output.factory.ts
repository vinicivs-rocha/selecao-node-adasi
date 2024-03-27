import { Injectable } from '@nestjs/common';
import { IUpdateActivityOutputFactory } from 'src/activities/application/factories/update-activity-output-factory';
import { UpdateActivityOutput } from 'src/activities/application/use-cases/update-activity/update-activity.output';
import { Activity } from 'src/activities/domain/entities/activity.entity';

@Injectable()
export class UpdateActivityOutputFactory
  implements IUpdateActivityOutputFactory
{
  create(activity: Activity): UpdateActivityOutput {
    const { id, date, scheduledEnd, scheduledStart, student, tasks } = activity;
    return {
      id,
      date,
      scheduledEnd,
      scheduledStart,
      studentCpf: student.cpf,
      taskIds: tasks.map((task) => task.id),
    };
  }
}
