import { ICreateActivityOutputFactory } from 'src/activities/application/factories/create-activity-output-factory';
import { CreateActivityOutput } from 'src/activities/application/use-cases/create-activity/create-activity.output';
import { Activity } from 'src/activities/domain/entities/activity.entity';

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
