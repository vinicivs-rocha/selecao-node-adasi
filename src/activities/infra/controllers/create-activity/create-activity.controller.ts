import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateActivityDto } from '../../../application/dto/create-activity.dto';
import { CreateActivityService } from '../../../application/use-cases/create-activity/create-activity.service';

@ApiTags('activities')
@Controller('activities')
export class CreateActivityController {
  constructor(private createActivityService: CreateActivityService) {}

  @Post()
  @ApiBadRequestResponse({
    description: 'Invalid data sent',
    schema: {
      example: {
        statusCode: 400,
        message: "Activity's duration should not exceed 6 hours",
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Related entities not found',
    schema: {
      example: {
        statusCode: 404,
        message:
          'No tasks found with ids [00000000-0000-0000-0000-000000000000, 00000000-0000-0000-0000-000000000001]',
        error: 'Not Found',
      },
    },
  })
  createActivity(@Body() createActivityDto: CreateActivityDto) {
    return this.createActivityService.execute(createActivityDto);
  }
}
