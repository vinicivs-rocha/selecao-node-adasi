import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStudentDto } from '../../../application/dto/create-student.dto';
import { UpdateStudentDto } from '../../../application/dto/update-student.dto';
import { CrudService } from '../../../application/use-cases/crud/crud.service';
import { CPFPipe } from '../../../pipes/cpf.pipe';

@Controller('students')
export class CrudController {
  constructor(private readonly studentsService: CrudService) {}

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
