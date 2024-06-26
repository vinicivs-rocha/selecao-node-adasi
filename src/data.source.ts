import { DataSource, DataSourceOptions } from 'typeorm';
import { Activity } from './activities/domain/entities/activity.entity';
import { Course } from './courses/domain/entities/course.entity';
import { Student } from './students/domain/entities/student.entity';
import { Task } from './tasks/domain/entities/task.entity';

export const dataSourceOpts: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'school',
  entities: [Course, Student, Task, Activity],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: process.env.DB_MIGRATIONS_TABLE || 'migrations',
};

export default new DataSource(dataSourceOpts);
