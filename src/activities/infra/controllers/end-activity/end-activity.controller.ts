import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { EndActivityDto } from '../../../application/dto/end-activity.dto';
import { EndActivityService } from '../../../application/use-cases/end-activity/end-activity.service';

@Controller('activities/end')
export class EndActivityController {
  constructor(private endActivityService: EndActivityService) {}

  @Post(':id')
  @HttpCode(200)
  async startActivity(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() end: EndActivityDto,
  ) {
    return this.endActivityService.execute(id, end);
  }
}
