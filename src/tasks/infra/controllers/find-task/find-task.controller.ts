import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindTaskService } from '../../../application/use-cases/find-task/find-task.service';

@ApiTags('tasks')
@Controller('tasks')
export class FindTaskController {
  constructor(private findTaskService: FindTaskService) {}
  @Get(':id')
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
  async findTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.findTaskService.execute(id);
  }
}
