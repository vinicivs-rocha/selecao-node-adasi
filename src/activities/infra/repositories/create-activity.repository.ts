import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Task } from 'src/tasks/domain/entities/task.entity';
import { In, Repository } from 'typeorm';
import { CreateActivityDto } from '../../application/dto/create-activity.dto';
import { Activity } from '../../domain/entities/activity.entity';
import { ICreateActivityRepository } from '../../domain/repositories/create-activity';

export class CreateActivityRepository implements ICreateActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(newActivity: CreateActivityDto): Promise<Activity> {
    const activity = this.activitiesRepository.create(newActivity);
    const student = await this.studentsRepository.findOne({
      where: { cpf: newActivity.studentCpf },
    });
    if (student === null)
      throw new NotFoundException(
        `Student with cpf ${newActivity.studentCpf} not found`,
      );
    activity.student = student;
    const tasks = await this.tasksRepository.find({
      where: { id: In(newActivity.taskIds) },
    });
    if (tasks.length === 0)
      throw new NotFoundException(
        `No tasks found with ids [${newActivity.taskIds.join(', ')}]`,
      );
    activity.tasks = tasks;
    return this.activitiesRepository.save(activity);
  }
}
