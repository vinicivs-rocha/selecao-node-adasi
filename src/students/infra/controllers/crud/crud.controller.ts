import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateStudentDto } from '../../../application/dto/create-student.dto';
import { UpdateStudentDto } from '../../../application/dto/update-student.dto';
import { CrudService } from '../../../application/use-cases/crud/crud.service';
import { CPFPipe } from '../../../pipes/cpf.pipe';

@ApiTags('students')
@Controller('students')
export class CrudController {
  constructor(private readonly studentsService: CrudService) {}

  @Post()
  @ApiBadRequestResponse({
    description: 'Invalid data sent',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'cpf must match /^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$/ regular expression',
          'cpf must be a string',
          'name must be a string',
          'registration must be a string',
          'courseId must be a UUID',
        ],
        error: 'Bad Request',
      },
    },
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':cpf')
  @ApiBadRequestResponse({
    description: 'Invalid cpf provided',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid CPF',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Non-existent cpf provided',
    schema: {
      example: {
        statusCode: 404,
        message: 'Student with cpf 000.000.000-00 not found',
        error: 'Not Found',
      },
    },
  })
  findOne(@Param('cpf', CPFPipe) cpf: string) {
    return this.studentsService.findOne(cpf);
  }

  @Patch(':cpf')
  @ApiBadRequestResponse({
    description: 'Invalid cpf provided',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid CPF',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Non-existent cpf provided',
    schema: {
      example: {
        statusCode: 404,
        message: 'Student with cpf 000.000.000-00 not found',
        error: 'Not Found',
      },
    },
  })
  update(
    @Param('cpf', CPFPipe) cpf: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(cpf, updateStudentDto);
  }

  @Delete(':cpf')
  @ApiBadRequestResponse({
    description: 'Invalid cpf provided',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid CPF',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Non-existent cpf provided',
    schema: {
      example: {
        statusCode: 404,
        message: 'Student with cpf 000.000.000-00 not found',
        error: 'Not Found',
      },
    },
  })
  remove(@Param('cpf', CPFPipe) cpf: string) {
    return this.studentsService.remove(cpf);
  }
}
