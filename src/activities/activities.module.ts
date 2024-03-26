import { BadRequestException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { Task } from '../tasks/domain/entities/task.entity';
import { CreateActivityService } from './application/use-cases/create-activity/create-activity.service';
import { Activity } from './domain/entities/activity.entity';
import { CreateActivityController } from './infra/controllers/create-activity/create-activity.controller';
import { CreateActivityOutputFactory } from './infra/factories/create-activity-output.factory';
import { CreateActivityRepository } from './infra/repositories/create-activity.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Student, Task])],
  controllers: [CreateActivityController],
  providers: [
    CreateActivityService,
    { provide: 'CreateActivityRepository', useClass: CreateActivityRepository },
    {
      provide: 'CreateActivityOutputFactory',
      useClass: CreateActivityOutputFactory,
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
