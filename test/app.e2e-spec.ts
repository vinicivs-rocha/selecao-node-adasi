import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => app.close());

  describe('Courses', () => {
    describe('Create course', () => {
      it('should respond with bad request when no name is provided', () => {
        return pactum
          .spec()
          .post('/courses')
          .expectStatus(400)
          .expectBody({
            statusCode: 400,
            message: ['name must be a string'],
            error: 'Bad Request',
          });
      });
      it('should create a course', async () => {
        const newCourse = {
          name: 'Cálculo I',
        };
        return pactum
          .spec()
          .post('/courses')
          .withBody(newCourse)
          .expectStatus(201)
          .expectJsonMatch({
            name: 'Cálculo I',
          })
          .stores('courseId', 'id');
      });
    });
    describe('List courses', () => {
      it('should list all courses', async () => {
        return pactum
          .spec()
          .get('/courses')
          .expectStatus(200)
          .expectJsonMatch([
            {
              name: 'Cálculo I',
            },
          ]);
      });
      it('should respond bad request when an invalid id is provided', async () => {
        return pactum.spec().get('/courses/1').expectStatus(400).expectBody({
          statusCode: 400,
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
        });
      });
      it('should respond not found when a non-existent id is provided', async () => {
        return pactum
          .spec()
          .get('/courses/00000000-0000-0000-0000-000000000000')
          .expectStatus(404)
          .expectBody({
            statusCode: 404,
            message:
              'Course with id 00000000-0000-0000-0000-000000000000 not found',
            error: 'Not Found',
          });
      });
      it('should list the created course', async () => {
        return pactum
          .spec()
          .get('/courses/$S{courseId}')
          .expectStatus(200)
          .expectJsonMatch({
            name: 'Cálculo I',
          });
      });
    });
    describe('Update courses', () => {
      it('should respond bad request when an invalid id is provided', async () => {
        return pactum.spec().patch('/courses/1').expectStatus(400).expectBody({
          statusCode: 400,
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
        });
      });
      it('should respond not found when a non-existent id is provided', async () => {
        return pactum
          .spec()
          .patch('/courses/00000000-0000-0000-0000-000000000000')
          .expectStatus(404)
          .expectBody({
            statusCode: 404,
            message:
              'Course with id 00000000-0000-0000-0000-000000000000 does not exists',
            error: 'Not Found',
          });
      });
      it('should update the selected course', async () => {
        return pactum
          .spec()
          .patch('/courses/$S{courseId}')
          .withBody({
            name: 'Cálculo II',
          })
          .expectStatus(200)
          .expectJsonMatch({
            name: 'Cálculo II',
          });
      });
    });
    describe('Delete courses', () => {
      it('should respond bad request when an invalid id is provided', async () => {
        return pactum.spec().delete('/courses/1').expectStatus(400).expectBody({
          statusCode: 400,
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
        });
      });
      it('should respond not found when a non-existent id is provided', async () => {
        return pactum
          .spec()
          .delete('/courses/00000000-0000-0000-0000-000000000000')
          .expectStatus(404)
          .expectBody({
            statusCode: 404,
            message:
              'Course with id 00000000-0000-0000-0000-000000000000 does not exists',
            error: 'Not Found',
          });
      });
      it('should delete the selected course', async () => {
        return pactum
          .spec()
          .delete('/courses/$S{courseId}')
          .expectStatus(200)
          .expectBody({
            id: '$S{courseId}',
          });
      });
    });
  });
});
