import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCourse1711376474141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "course" (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR NOT NULL
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "course"`);
  }
}
