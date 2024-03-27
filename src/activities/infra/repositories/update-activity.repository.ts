import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Student } from '../../../students/entities/student.entity';
import { Task } from '../../../tasks/domain/entities/task.entity';
import { UpdateActivityDto } from '../../application/dto/update-activity.dto';
import { Activity } from '../../domain/entities/activity.entity';
import { IUpdateActivityRepository } from '../../domain/repositories/update-activity';

@Injectable()
export class UpdateActivityRepository implements IUpdateActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async update(id: string, dto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (activity === null)
      throw new NotFoundException(`Activity with id ${id} not found`);

    activity.date = dto.date ?? activity.date;
    activity.scheduledEnd = dto.scheduledEnd ?? activity.scheduledEnd;
    activity.scheduledStart = dto.scheduledStart ?? activity.scheduledStart;

    const student = await this.studentsRepository.findOne({
      where: { cpf: dto.studentCpf },
    });
    if (student === null)
      throw new NotFoundException(
        `Student with cpf ${dto.studentCpf} not found`,
      );
    activity.student = student;

    const taskIds = dto.taskIds ?? activity.tasks.map((task) => task.id);
    const tasks = await this.tasksRepository.find({
      where: { id: In(taskIds) },
    });
    const notFoundTasks =
      taskIds.filter(
        (id) => tasks.find((task) => task.id === id) === undefined,
      ) ?? [];

    if (notFoundTasks.length > 0)
      throw new NotFoundException(
        `Tasks with ids [${notFoundTasks.join(', ')}] not found`,
      );

    activity.tasks = tasks;

    await this.activitiesRepository.update(id, activity);
    return activity;
  }
}
