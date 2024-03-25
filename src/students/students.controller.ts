import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CPFPipe } from './pipes/cpf.pipe';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf', CPFPipe) cpf: string) {
    return this.studentsService.findOne(cpf);
  }

  @Patch(':cpf')
  update(
    @Param('cpf', CPFPipe) cpf: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(cpf, updateStudentDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf', CPFPipe) cpf: string) {
    return this.studentsService.remove(cpf);
  }
}
