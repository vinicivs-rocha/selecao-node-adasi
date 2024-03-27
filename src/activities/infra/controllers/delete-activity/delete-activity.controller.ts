import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteActivityService } from '../../../application/use-cases/delete-activity/delete-activity.service';

@Controller('activities')
export class DeleteActivityController {
  constructor(private deleteActivityService: DeleteActivityService) {}

  @Delete(':id')
  async deleteActivity(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteActivityService.execute(id);
  }
}
