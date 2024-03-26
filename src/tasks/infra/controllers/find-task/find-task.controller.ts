import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FindTaskService } from '../../../application/use-cases/find-task/find-task.service';

@Controller('tasks')
export class FindTaskController {
  constructor(private findTaskService: FindTaskService) {}
  @Get(':id')
  async findTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.findTaskService.execute(id);
  }
}
