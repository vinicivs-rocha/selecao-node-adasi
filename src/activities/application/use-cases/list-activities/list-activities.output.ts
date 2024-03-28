import { FindTaskOutput } from 'src/tasks/application/use-cases/find-task/find-task.output';

export class ListActivitiesOutput {
  id: string;
  date: string;
  scheduledEnd: string;
  scheduledStart: string;
  student: {
    cpf: string;
    name: string;
    registration: string;
    course: {
      id: string;
      name: string;
    };
  };
  tasks: FindTaskOutput[];
  actualStart?: string;
  actualEnd?: string;
}
