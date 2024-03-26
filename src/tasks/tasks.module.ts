import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskService } from './application/use-cases/create-task/create-task.service';
import { Task } from './domain/entities/task.entity';
import { CreateTaksController } from './infra/controllers/create-task/create-task.controller';
import { CreateTaskOutputFactory } from './infra/factories/create-output.factory';
import { CreateTaskRepository } from './infra/repositories/create-task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [CreateTaksController],
  providers: [
    CreateTaskService,
    { provide: 'CreateTaskRepository', useClass: CreateTaskRepository },
    { provide: 'CreateTaskOutputFactory', useClass: CreateTaskOutputFactory },
  ],
})
export class TasksModule {}
