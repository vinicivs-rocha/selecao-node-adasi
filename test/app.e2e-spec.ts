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
          });
      });
    });
  });
});
