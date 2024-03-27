import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from '../../../students/domain/entities/student.entity';
import { Task } from '../../../tasks/domain/entities/task.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'timestamptz', name: 'scheduled_start' })
  scheduledStart: string;

  @Column({ type: 'timestamptz', name: 'scheduled_end' })
  scheduledEnd: string;

  @Column({ type: 'timestamptz', name: 'actual_start', nullable: true })
  actualStart?: string;

  @Column({ type: 'timestamptz', name: 'actual_end', nullable: true })
  actualEnd?: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_cpf' })
  student: Student;

  @ManyToMany(() => Task)
  @JoinTable({
    name: 'activity_tasks',
    joinColumn: {
      name: 'activity_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_ACTIVITY_TASKS_ACTIVITY',
    },
    inverseJoinColumn: {
      name: 'task_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_ACTIVITY_TASKS_TASK',
    },
  })
  @ApiProperty({ type: () => [Task] })
  tasks: Task[];
}
