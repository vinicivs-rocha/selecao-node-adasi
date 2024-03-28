import { Controller, Get } from '@nestjs/common';
import { ListTasksService } from '../../../application/use-cases/list-tasks/list-tasks.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class ListTasksController {
  constructor(private listTasksService: ListTasksService) {}

  @Get()
  async listTasks() {
    return this.listTasksService.execute();
  }
}
