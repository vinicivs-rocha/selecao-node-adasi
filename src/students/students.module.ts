import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../courses/domain/entities/course.entity';
import { CrudService } from './application/use-cases/crud/crud.service';
import { Student } from './domain/entities/student.entity';
import { CrudController } from './infra/controllers/crud/crud.controller';
import { RemoveOutputFactory } from './infra/factories/remove-output.factory';
import { UpdateOutputFactory } from './infra/factories/update-output.factory';
import { StudentsCrudRepository } from './infra/repositories/crud.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course])],
  controllers: [CrudController],
  providers: [
    CrudService,
    {
      provide: 'StudentsCrudRepository',
      useClass: StudentsCrudRepository,
    },
    {
      provide: 'RemoveOutputFactory',
      useClass: RemoveOutputFactory,
    },
    {
      provide: 'UpdateOutputFactory',
      useClass: UpdateOutputFactory,
    },
  ],
})
export class StudentsModule {}
