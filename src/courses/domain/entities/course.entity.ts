import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../../students/domain/entities/student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.course, {
    onDelete: 'CASCADE',
  })
  students: Student[];
}
