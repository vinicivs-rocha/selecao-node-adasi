import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { dataSourceOpts } from './data.source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOpts), CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
