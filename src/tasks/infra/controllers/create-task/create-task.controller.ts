import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from '../../../application/dto/create-task.dto';
import { CreateTaskService } from '../../../application/use-cases/create-task/create-task.service';

@ApiTags('tasks')
@Controller('tasks')
export class CreateTaksController {
  constructor(private createTaskService: CreateTaskService) {}

  @Post()
  @ApiBadRequestResponse({
    description: 'Invalid data sent',
    schema: {
      example: {
        statusCode: 400,
        message: ['name must be a string'],
        error: 'Bad Request',
      },
    },
  })
  async create(@Body() task: CreateTaskDto) {
    return this.createTaskService.execute(task);
  }
}
