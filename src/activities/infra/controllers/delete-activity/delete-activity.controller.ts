import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteActivityService } from '../../../application/use-cases/delete-activity/delete-activity.service';

@ApiTags('activities')
@Controller('activities')
export class DeleteActivityController {
  constructor(private deleteActivityService: DeleteActivityService) {}

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
        message:
          'Activity with id 00000000-0000-0000-0000-000000000000 not found',
        error: 'Not Found',
      },
    },
  })
  async deleteActivity(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteActivityService.execute(id);
  }
}
