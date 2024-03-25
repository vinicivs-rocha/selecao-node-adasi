import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'school',
      entities: [],
      migrations: [],
      migrationsTableName: process.env.DB_MIGRATIONS_TABLE || 'migrations',
    }),
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
