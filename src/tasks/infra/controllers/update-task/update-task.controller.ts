import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateTaskDto } from '../../../application/dto/update-task.dto';
import { UpdateTaskService } from '../../../application/use-cases/update-task/update-task.service';

@ApiTags('tasks')
@Controller('tasks')
export class UpdateTaskController {
  constructor(private updateTaskService: UpdateTaskService) {}

  @Patch(':id')
  @ApiBadRequestResponse({
    description: 'Invalid id provided',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed (uuid is expected)',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Non-existent id provided',
    schema: {
      example: {
        statusCode: 404,
        message: 'Task with id 00000000-0000-0000-0000-000000000000 not found',
        error: 'Not Found',
      },
    },
  })
  updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() task: UpdateTaskDto,
  ) {
    return this.updateTaskService.execute(id, task);
  }
}
