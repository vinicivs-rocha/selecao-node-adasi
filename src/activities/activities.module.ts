import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { Task } from '../tasks/domain/entities/task.entity';
import { CreateActivityService } from './application/use-cases/create-activity/create-activity.service';
import { DeleteActivityService } from './application/use-cases/delete-activity/delete-activity.service';
import { FindActivityService } from './application/use-cases/find-activity/find-activity.service';
import { ListActivitiesService } from './application/use-cases/list-activities/list-activities.service';
import { UpdateActivityService } from './application/use-cases/update-activity/update-activity.service';
import { Activity } from './domain/entities/activity.entity';
import { CreateActivityController } from './infra/controllers/create-activity/create-activity.controller';
import { FindActivityController } from './infra/controllers/find-activity/find-activity.controller';
import { ListActivitiesController } from './infra/controllers/list-activities/list-activities.controller';
import { UpdateActivityController } from './infra/controllers/update-activity/update-activity.controller';
import { CreateActivityOutputFactory } from './infra/factories/create-activity-output.factory';
import { FindActivityOutputFactory } from './infra/factories/find-activity-output.factory';
import { ListActivitiesOutputFactory } from './infra/factories/list-activities-output.factory';
import { UpdateActivityOutputFactory } from './infra/factories/update-activity-output.factory';
import { CreateActivityRepository } from './infra/repositories/create-activity.repository';
import { FindActivityRepository } from './infra/repositories/find-activity.repository';
import { ListActivitiesRepository } from './infra/repositories/list-activities.repository';
import { UpdateActivityRepository } from './infra/repositories/update-activity.repository';
import { DeleteActivityOutputFactory } from './infra/factories/delete-activity-output.factory';
import { DeleteActivityRepository } from './infra/repositories/delete-activity.repository';
import { DeleteActivityController } from './infra/controllers/delete-activity/delete-activity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Student, Task])],
  controllers: [
    CreateActivityController,
    ListActivitiesController,
    FindActivityController,
    UpdateActivityController,
    DeleteActivityController,
  ],
  providers: [
    CreateActivityService,
    ListActivitiesService,
    FindActivityService,
    UpdateActivityService,
    DeleteActivityService,
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
      provide: 'FindActivityRepository',
      useClass: FindActivityRepository,
    },
    {
      provide: 'FindActivityOutputFactory',
      useClass: FindActivityOutputFactory,
    },
    {
      provide: 'UpdateActivityRepository',
      useClass: UpdateActivityRepository,
    },
    {
      provide: 'UpdateActivityOutputFactory',
      useClass: UpdateActivityOutputFactory,
    },
    {
      provide: 'DeleteActivityRepository',
      useClass: DeleteActivityRepository,
    },
    {
      provide: 'DeleteActivityOutputFactory',
      useClass: DeleteActivityOutputFactory,
    },
  ],
})
export class ActivitiesModule {}
