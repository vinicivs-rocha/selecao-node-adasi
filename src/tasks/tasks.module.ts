import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskService } from './application/use-cases/create-task/create-task.service';
import { ListTasksService } from './application/use-cases/list-tasks/list-tasks.service';
import { Task } from './domain/entities/task.entity';
import { CreateTaksController } from './infra/controllers/create-task/create-task.controller';
import { ListTasksController } from './infra/controllers/list-tasks/list-tasks.controller';
import { CreateTaskOutputFactory } from './infra/factories/create-output.factory';
import { ListTasksOutputFactory } from './infra/factories/list-tasks-output.factory';
import { CreateTaskRepository } from './infra/repositories/create-task.repository';
import { ListTasksRepository } from './infra/repositories/list-tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [CreateTaksController, ListTasksController],
  providers: [
    CreateTaskService,
    { provide: 'CreateTaskRepository', useClass: CreateTaskRepository },
    { provide: 'CreateTaskOutputFactory', useClass: CreateTaskOutputFactory },
    { provide: 'ListTasksRepository', useClass: ListTasksRepository },
    { provide: 'ListTasksOutputFactory', useClass: ListTasksOutputFactory },
    ListTasksService,
  ],
})
export class TasksModule {}
