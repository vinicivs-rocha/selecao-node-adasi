import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudService } from './application/use-cases/crud/crud.service';
import { Course } from './domain/entities/course.entity';
import { CrudController } from './infra/controllers/crud/crud.controller';
import { CrudRepository } from './infra/repositories/crud.repository';
import { RemoveOutputFactory } from './infra/factories/remove-output.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CrudController],
  providers: [
    CrudService,
    {
      provide: 'CrudRepository',
      useClass: CrudRepository,
    },
    {
      provide: 'RemoveOutputFactory',
      useClass: RemoveOutputFactory,
    },
  ],
})
export class CoursesModule {}
