import { Student } from 'src/students/entities/student.entity';
import { Task } from 'src/tasks/domain/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'timestamptz', name: 'scheduled_start' })
  scheduledStart: Date;

  @Column({ type: 'timestamptz', name: 'scheduled_end' })
  scheduledEnd: Date;

  @Column({ type: 'timestamptz', name: 'actual_start', nullable: true })
  actualStart?: Date;

  @Column({ type: 'timestamptz', name: 'actual_end', nullable: true })
  actualEnd?: Date;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToMany(() => Task)
  @JoinTable({
    name: 'activity_tasks',
    joinColumn: { name: 'activity_id' },
    inverseJoinColumn: { name: 'task_id' },
  })
  tasks: Task[];
}
