import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteTaskService } from '../../../application/use-cases/delete-task/delete-task.service';

@ApiTags('tasks')
@Controller('tasks')
export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) {}

  @Delete(':id')
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
  async deleteTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteTaskService.execute(id);
  }
}
