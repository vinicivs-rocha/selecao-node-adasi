import { Course } from 'src/courses/entities/course.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Student {
  @Column({ unique: true })
  cpf: string;

  @Column()
  name: string;

  @Column({ unique: true })
  registration: string;

  @OneToMany(() => Course, (course) => course.students)
  course: Course;
}
