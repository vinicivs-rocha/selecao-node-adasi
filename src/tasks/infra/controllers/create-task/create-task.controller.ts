import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from '../../../application/dto/create-task.dto';
import { CreateTaskService } from '../../../application/use-cases/create-task/create-task.service';

@Controller('tasks')
export class CreateTaksController {
  constructor(private createTaskService: CreateTaskService) {}

  @Post()
  async create(@Body() task: CreateTaskDto) {
    return this.createTaskService.execute(task);
  }
}
