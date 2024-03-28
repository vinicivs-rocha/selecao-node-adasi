import { Controller, Get } from '@nestjs/common';
import { ListActivitiesService } from '../../../application/use-cases/list-activities/list-activities.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('activities')
@Controller('activities')
export class ListActivitiesController {
  constructor(private listActivitiesService: ListActivitiesService) {}

  @Get()
  async listAll() {
    return this.listActivitiesService.execute();
  }
}
