import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteTaskService } from '../../../application/use-cases/delete-task/delete-task.service';

@Controller('tasks')
export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) {}
  @Delete(':id')
  async deleteTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteTaskService.execute(id);
  }
}
