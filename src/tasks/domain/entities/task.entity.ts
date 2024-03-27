import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from '../../../activities/domain/entities/activity.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Activity)
  activities: Activity[];
}
