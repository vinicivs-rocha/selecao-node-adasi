import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindActivityService } from '../../../application/use-cases/find-activity/find-activity.service';

@ApiTags('activities')
@Controller('activities')
export class FindActivityController {
  constructor(private findActivityService: FindActivityService) {}

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
        message:
          'Activity with id 00000000-0000-0000-0000-000000000000 not found',
        error: 'Not Found',
      },
    },
  })
  async findActivity(@Param('id', ParseUUIDPipe) id: string) {
    return this.findActivityService.execute(id);
  }
}
