import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateActivityDto } from '../../../application/dto/create-activity.dto';
import { CreateActivityService } from '../../../application/use-cases/create-activity/create-activity.service';

@Controller('activities')
export class CreateActivityController {
  constructor(private createActivityService: CreateActivityService) {}

  @Post()
  createActivity(@Body() createActivityDto: CreateActivityDto) {
    try {
      return this.createActivityService.execute(createActivityDto);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
    }
  }
}
