import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCourseDto } from '../../../application/dto/create-course.dto';
import { UpdateCourseDto } from '../../../application/dto/update-course.dto';
import { CrudService } from '../../../application/use-cases/crud/crud.service';

@Controller('courses')
@ApiTags('courses')
export class CrudController {
  constructor(private readonly coursesService: CrudService) {}

  @Post()
  @ApiResponse({
    status: 400,
    description: 'Invalid course data sent',
    schema: {
      example: {
        statusCode: 400,
        message: ['name must be a string'],
        error: 'Bad Request',
      },
    },
  })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.coursesService.remove(id);
  }
}
