import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitActivity1711465174247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "activity" (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            date DATE NOT NULL,
            scheduled_start TIMESTAMPTZ NOT NULL,
            scheduled_end TIMESTAMPTZ NOT NULL,
            actual_start TIMESTAMPTZ,
            actual_end TIMESTAMPTZ,
            student_cpf VARCHAR(14) NOT NULL,

            CONSTRAINT "FK_ACTIVITY_STUDENT"
                FOREIGN KEY (student_cpf)
                REFERENCES "student" (cpf)
                ON DELETE CASCADE
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "activity"`);
  }
}
