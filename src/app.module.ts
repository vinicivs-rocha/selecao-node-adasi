import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { dataSourceOpts } from './data.source';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOpts),
    CoursesModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
