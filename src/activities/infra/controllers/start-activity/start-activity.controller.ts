import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { StartActivityDto } from '../../../application/dto/start-activity.dto';
import { StartActivityService } from '../../../application/use-cases/start-activity/start-activity.service';

@Controller('activities/start')
export class StartActivityController {
  constructor(private startActivityService: StartActivityService) {}

  @Post(':id')
  @HttpCode(200)
  async startActivity(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() start: StartActivityDto,
  ) {
    return this.startActivityService.execute(id, start);
  }
}
