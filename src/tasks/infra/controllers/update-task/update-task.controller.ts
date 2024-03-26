import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { UpdateTaskDto } from '../../../application/dto/update-task.dto';
import { UpdateTaskService } from '../../../application/use-cases/update-task/update-task.service';

@Controller('tasks')
export class UpdateTaskController {
  constructor(private updateTaskService: UpdateTaskService) {}

  @Patch(':id')
  updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() task: UpdateTaskDto,
  ) {
    return this.updateTaskService.execute(id, task);
  }
}
