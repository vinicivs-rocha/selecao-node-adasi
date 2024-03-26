import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FindActivityService } from '../../../application/use-cases/find-activity/find-activity.service';

@Controller('activities')
export class FindActivityController {
  constructor(private findActivityService: FindActivityService) {}

  @Get(':id')
  async findActivity(@Param('id', ParseUUIDPipe) id: string) {
    return this.findActivityService.execute(id);
  }
}
