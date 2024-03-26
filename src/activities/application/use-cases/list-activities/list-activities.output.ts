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
  tasks: {
    id: string;
    name: string;
  }[];
  actualStart?: string;
  actualEnd?: string;
}
