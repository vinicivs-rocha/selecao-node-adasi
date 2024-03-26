import { BadRequestException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { Task } from '../tasks/domain/entities/task.entity';
import { CreateActivityService } from './application/use-cases/create-activity/create-activity.service';
import { ListActivitiesService } from './application/use-cases/list-activities/list-activities.service';
import { Activity } from './domain/entities/activity.entity';
import { CreateActivityController } from './infra/controllers/create-activity/create-activity.controller';
import { ListActivitiesController } from './infra/controllers/list-activities/list-activities.controller';
import { CreateActivityOutputFactory } from './infra/factories/create-activity-output.factory';
import { ListActivitiesOutputFactory } from './infra/factories/list-activities-output.factory';
import { CreateActivityRepository } from './infra/repositories/create-activity.repository';
import { ListActivitiesRepository } from './infra/repositories/list-activities.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Student, Task])],
  controllers: [CreateActivityController, ListActivitiesController],
  providers: [
    CreateActivityService,
    ListActivitiesService,
    { provide: 'CreateActivityRepository', useClass: CreateActivityRepository },
    {
      provide: 'CreateActivityOutputFactory',
      useClass: CreateActivityOutputFactory,
    },
    {
      provide: 'ListActivitiesRepository',
      useClass: ListActivitiesRepository,
    },
    {
      provide: 'ListActivitiesOutputFactory',
      useClass: ListActivitiesOutputFactory,
    },
    {
      provide: 'BadRequestException',
      useFactory: () => {
        return new BadRequestException();
      },
    },
  ],
})
export class ActivitiesModule {}
