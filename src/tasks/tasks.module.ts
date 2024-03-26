import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskService } from './application/use-cases/create-task/create-task.service';
import { FindTaskService } from './application/use-cases/find-task/find-task.service';
import { ListTasksService } from './application/use-cases/list-tasks/list-tasks.service';
import { UpdateTaskService } from './application/use-cases/update-task/update-task.service';
import { Task } from './domain/entities/task.entity';
import { CreateTaksController } from './infra/controllers/create-task/create-task.controller';
import { FindTaskController } from './infra/controllers/find-task/find-task.controller';
import { ListTasksController } from './infra/controllers/list-tasks/list-tasks.controller';
import { UpdateTaskController } from './infra/controllers/update-task/update-task.controller';
import { CreateTaskOutputFactory } from './infra/factories/create-output.factory';
import { FindTaskOutputFactory } from './infra/factories/find-task-output.factory';
import { ListTasksOutputFactory } from './infra/factories/list-tasks-output.factory';
import { CreateTaskRepository } from './infra/repositories/create-task.repository';
import { FindTaskRepository } from './infra/repositories/find-task.repository';
import { ListTasksRepository } from './infra/repositories/list-tasks.repository';
import { UpdateTaskOutputFactory } from './infra/factories/update-task-output.factory';
import { UpdateTaskRepository } from './infra/repositories/update-task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [
    CreateTaksController,
    ListTasksController,
    FindTaskController,
    UpdateTaskController,
  ],
  providers: [
    CreateTaskService,
    ListTasksService,
    FindTaskService,
    { provide: 'CreateTaskRepository', useClass: CreateTaskRepository },
    { provide: 'CreateTaskOutputFactory', useClass: CreateTaskOutputFactory },
    { provide: 'ListTasksRepository', useClass: ListTasksRepository },
    { provide: 'ListTasksOutputFactory', useClass: ListTasksOutputFactory },
    { provide: 'FindTaskRepository', useClass: FindTaskRepository },
    { provide: 'FindTaskOutputFactory', useClass: FindTaskOutputFactory },
    { provide: 'UpdateTaskRepository', useClass: UpdateTaskRepository },
    { provide: 'UpdateTaskOutputFactory', useClass: UpdateTaskOutputFactory },
    UpdateTaskService,
  ],
})
export class TasksModule {}
