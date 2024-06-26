import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Course } from '../../../courses/domain/entities/course.entity';

@Entity()
export class Student {
  @Column({ unique: true, primary: true })
  cpf: string;

  @Column()
  name: string;

  @Column({ unique: true })
  registration: string;

  @ManyToOne(() => Course, (course) => course.students)
  @JoinColumn({ name: 'course_id' })
  @ApiProperty({ type: () => Course })
  course: Course;
}
