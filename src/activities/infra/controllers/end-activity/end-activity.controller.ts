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
import { EndActivityDto } from '../../../application/dto/end-activity.dto';
import { EndActivityService } from '../../../application/use-cases/end-activity/end-activity.service';

@ApiTags('activities')
@Controller('activities/end')
export class EndActivityController {
  constructor(private endActivityService: EndActivityService) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Activity ended successfully',
    schema: {
      example: {
        endTime: '2022-12-31T08:10:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid data sent',
    schema: {
      example: {
        statusCode: 400,
        message: 'The activity has not started yet',
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
    @Body() end: EndActivityDto,
  ) {
    return this.endActivityService.execute(id, end);
  }
}
