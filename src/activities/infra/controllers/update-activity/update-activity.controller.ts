import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { UpdateActivityDto } from '../../../application/dto/update-activity.dto';
import { UpdateActivityService } from '../../../application/use-cases/update-activity/update-activity.service';

@Controller('activities')
export class UpdateActivityController {
  constructor(private updateActivityService: UpdateActivityService) {}
  @Patch(':id')
  async updateActivity(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateActivityDto,
  ) {
    return this.updateActivityService.execute(id, dto);
  }
}
