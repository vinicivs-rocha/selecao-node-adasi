import { Injectable } from '@nestjs/common';
import { IFindActivityOutputFactory } from 'src/activities/application/factories/find-activities-output-factory';
import { ListActivitiesOutput } from 'src/activities/application/use-cases/list-activities/list-activities.output';
import { Activity } from 'src/activities/domain/entities/activity.entity';

@Injectable()
export class FindActivityOutputFactory implements IFindActivityOutputFactory {
  create(activity: Activity): ListActivitiesOutput {
    const {
      id,
      date,
      scheduledEnd,
      scheduledStart,
      actualEnd,
      actualStart,
      student,
      tasks,
    } = activity;
    return {
      id,
      date,
      scheduledEnd,
      scheduledStart,
      actualEnd,
      actualStart,
      student: {
        cpf: student.cpf,
        name: student.name,
        registration: student.registration,
        course: {
          id: student.course.id,
          name: student.course.name,
        },
      },
      tasks: tasks.map((task) => ({
        id: task.id,
        name: task.name,
      })),
    };
  }
}
