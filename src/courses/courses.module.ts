import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudService } from './application/use-cases/crud/crud.service';
import { Course } from './domain/entities/course.entity';
import { CrudController } from './infra/controllers/crud/crud.controller';
import { RemoveOutputFactory } from './infra/factories/remove-output.factory';
import { CoursesCrudRepository } from './infra/repositories/crud.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CrudController],
  providers: [
    CrudService,
    {
      provide: 'CoursesCrudRepository',
      useClass: CoursesCrudRepository,
    },
    {
      provide: 'RemoveOutputFactory',
      useClass: RemoveOutputFactory,
    },
  ],
})
export class CoursesModule {}
