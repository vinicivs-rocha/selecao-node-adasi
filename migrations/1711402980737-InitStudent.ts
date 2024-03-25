import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitStudent1711402980737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "student" (
                cpf VARCHAR(14) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                registration VARCHAR(255) NOT NULL,
                course_id uuid NOT NULL,
                CONSTRAINT "FK_STUDENT_COURSE" FOREIGN KEY (course_id) REFERENCES course(id)
                CONSTRAINT "UQ_STUDENT_REGISTRATION" UNIQUE (registration)
                CONSTRAINT "UQ_STUDENT_CPF" UNIQUE (cpf) 
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "student"`);
  }
}
