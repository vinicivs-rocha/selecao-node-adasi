import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitActivityTasks1711466014497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "activity_tasks" (
            activity_id uuid NOT NULL,
            task_id uuid NOT NULL,
            PRIMARY KEY (activity_id, task_id),
            CONSTRAINT "FK_ACTIVITY_TASKS_ACTIVITY"
                FOREIGN KEY (activity_id)
                REFERENCES "activity" (id)
                ON DELETE CASCADE,
            CONSTRAINT "FK_ACTIVITY_TASKS_TASK"
                FOREIGN KEY (task_id)
                REFERENCES "task" (id)
                ON DELETE CASCADE
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "activity_tasks"`);
  }
}
