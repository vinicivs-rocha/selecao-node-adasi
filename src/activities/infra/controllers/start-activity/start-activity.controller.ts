import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StartActivityDto } from '../../../application/dto/start-activity.dto';
import { StartActivityService } from '../../../application/use-cases/start-activity/start-activity.service';

@ApiTags('activities')
@Controller('activities/start')
export class StartActivityController {
  constructor(private startActivityService: StartActivityService) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Activity started successfully',
    schema: {
      example: {
        startTime: '2022-12-31T08:05:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid data sent',
    schema: {
      example: {
        statusCode: 400,
        message:
          'The start time must have a maximum of 15 minutes difference from the scheduled start time',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Activity not found',
    schema: {
      example: {
        statusCode: 404,
        message:
          'Activity with id 00000000-0000-0000-0000-000000000000 not found',
        error: 'Not Found',
      },
    },
  })
  async startActivity(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() start: StartActivityDto,
  ) {
    return this.startActivityService.execute(id, start);
  }
}
