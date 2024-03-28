import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateActivityDto } from '../../../application/dto/update-activity.dto';
import { UpdateActivityService } from '../../../application/use-cases/update-activity/update-activity.service';

@ApiTags('activities')
@Controller('activities')
export class UpdateActivityController {
  constructor(private updateActivityService: UpdateActivityService) {}
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
        message:
          'Activity with id 00000000-0000-0000-0000-000000000000 not found',
        error: 'Not Found',
      },
    },
  })
  async updateActivity(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateActivityDto,
  ) {
    return this.updateActivityService.execute(id, dto);
  }
}
