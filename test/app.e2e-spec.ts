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
  describe('Students', () => {
    describe('Create student', () => {
      it('should respond with bad request when no data is provided', () => {
        return pactum
          .spec()
          .post('/students')
          .expectStatus(400)
          .expectBody({
            statusCode: 400,
            message: [
              'cpf must match /^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$/ regular expression',
              'cpf must be a string',
              'name must be a string',
              'registration must be a string',
              'course_id must be a UUID',
            ],
            error: 'Bad Request',
          });
      });
      it('should create a student', async () => {
        const newStudent = {
          cpf: '012.345.678-90',
          name: 'João da Silva',
          registration: '123456',
          course_id: '$S{courseId}',
        };
        const newCourse = {
          name: 'Cálculo I',
        };
        await pactum
          .spec()
          .post('/courses')
          .withBody(newCourse)
          .stores('courseId', 'id');

        return pactum
          .spec()
          .post('/students')
          .withBody(newStudent)
          .expectStatus(201)
          .expectJsonMatch({
            cpf: newStudent.cpf,
            name: newStudent.name,
            registration: newStudent.registration,
            course: {
              id: '$S{courseId}',
              name: 'Cálculo I',
              students: [],
            },
          })
          .stores('studentCpf', 'cpf');
      });
    });
    describe('List students', () => {
      it('should list all students', async () => {
        const student = {
          cpf: '012.345.678-90',
          name: 'João da Silva',
          registration: '123456',
          course_id: '$S{courseId}',
        };
        const course = {
          name: 'Cálculo I',
        };
        return pactum
          .spec()
          .get('/students')
          .expectStatus(200)
          .expectJsonMatch([
            {
              cpf: student.cpf,
              name: student.name,
              registration: student.registration,
              course: {
                id: '$S{courseId}',
                ...course,
              },
            },
          ]);
      });
      it('should respond bad request when an invalid cpf is provided', async () => {
        return pactum.spec().get('/students/1').expectStatus(400).expectBody({
          statusCode: 400,
          message: 'Invalid CPF',
          error: 'Bad Request',
        });
      });
      it('should respond not found when a non-existent cpf is provided', async () => {
        return pactum
          .spec()
          .get('/students/000.000.000-00')
          .expectStatus(404)
          .expectBody({
            statusCode: 404,
            message: 'Student with cpf 000.000.000-00 not found',
            error: 'Not Found',
          });
      });
      it('should list the created student', async () => {
        return pactum
          .spec()
          .get('/students/$S{studentCpf}')
          .expectStatus(200)
          .expectJsonMatch({
            cpf: '012.345.678-90',
            name: 'João da Silva',
            registration: '123456',
            course: {
              id: '$S{courseId}',
              name: 'Cálculo I',
            },
          });
      });
    });
    describe('Update students', () => {
      it('should respond bad request when an invalid cpf is provided', async () => {
        return pactum.spec().patch('/students/1').expectStatus(400).expectBody({
          statusCode: 400,
          message: 'Invalid CPF',
          error: 'Bad Request',
        });
      });
      it('should respond not found when a non-existent cpf is provided', async () => {
        return pactum
          .spec()
          .patch('/students/000.000.000-00')
          .expectStatus(404)
          .expectBody({
            statusCode: 404,
            message: 'Student with cpf 000.000.000-00 does not exists',
            error: 'Not Found',
          });
      });
      it('should update the selected student', async () => {
        const newCourse = {
          name: 'Cálculo II',
        };
        await pactum
          .spec()
          .post('/courses')
          .withBody(newCourse)
          .stores('courseId', 'id');

        return pactum
          .spec()
          .patch('/students/$S{studentCpf}')
          .withBody({
            cpf: '012.345.678-90',
            name: 'João da Silva',
            registration: '123456',
            course_id: '$S{courseId}',
          })
          .expectStatus(200)
          .expectJsonMatch({
            cpf: '012.345.678-90',
            name: 'João da Silva',
            registration: '123456',
            course: {
              id: '$S{courseId}',
              name: 'Cálculo II',
            },
          });
      });
    });
    describe('Delete students', () => {
      it('should respond bad request when an invalid cpf is provided', async () => {
        return pactum
          .spec()
          .delete('/students/1')
          .expectStatus(400)
          .expectBody({
            statusCode: 400,
            message: 'Invalid CPF',
            error: 'Bad Request',
          });
      });
      it('should respond not found when a non-existent cpf is provided', async () => {
        return pactum
          .spec()
          .delete('/students/000.000.000-00')
          .expectStatus(404)
          .expectBody({
            statusCode: 404,
            message: 'Student with cpf 000.000.000-00 does not exists',
            error: 'Not Found',
          });
      });
      it('should delete the selected student', async () => {
        return pactum
          .spec()
          .delete('/students/$S{studentCpf}')
          .expectStatus(200)
          .expectBody({
            cpf: '$S{studentCpf}',
          });
      });
    });
  });
  describe('Tasks', () => {
    describe('Create task', () => {
      it('should respond with bad request when no data is provided', () => {
        return pactum
          .spec()
          .post('/tasks')
          .expectStatus(400)
          .expectBody({
            statusCode: 400,
            message: ['name must be a string'],
            error: 'Bad Request',
          });
      });
      it('should create a task', async () => {
        const newTask = {
          name: 'Derivar a função f(x) = x²',
        };
        return pactum
          .spec()
          .post('/tasks')
          .withBody(newTask)
          .expectStatus(201)
          .expectJsonMatch({
            name: newTask.name,
          })
          .stores('taskId', 'id');
      });
    });
    describe('List tasks', () => {
      it('should list all tasks', async () => {
        return pactum
          .spec()
          .get('/tasks')
          .expectStatus(200)
          .expectJsonMatch([
            {
              name: 'Derivar a função f(x) = x²',
            },
          ]);
      });
      it('should respond bad request when an invalid id is provided', async () => {
        return pactum.spec().get('/tasks/1').expectStatus(400).expectBody({
          statusCode: 400,
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
        });
      });
      it('should respond not found when a non-existent id is provided', async () => {
        return pactum
          .spec()
          .get('/tasks/00000000-0000-0000-0000-000000000000')
          .expectStatus(404)
          .expectBody({
            statusCode: 404,
            message:
              'Task with id 00000000-0000-0000-0000-000000000000 not found',
            error: 'Not Found',
          });
      });
      it('should list the created task', async () => {
        return pactum
          .spec()
          .get('/tasks/$S{taskId}')
          .expectStatus(200)
          .expectJsonMatch({
            name: 'Derivar a função f(x) = x²',
          });
      });
    });
    describe('Update tasks', () => {
      it('should respond bad request when an invalid id is provided', async () => {
        return pactum.spec().patch('/tasks/1').expectStatus(400).expectBody({
          statusCode: 400,
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
        });
      });
      it('should respond not found when a non-existent id is provided', async () => {
        return pactum
          .spec()
          .patch('/tasks/00000000-0000-0000-0000-000000000000')
          .expectStatus(404)
          .expectBody({
            statusCode: 404,
            message:
              'Task with id 00000000-0000-0000-0000-000000000000 not found',
            error: 'Not Found',
          });
      });
      it('should update the selected task', async () => {
        return pactum
          .spec()
          .patch('/tasks/$S{taskId}')
          .withBody({
            name: 'Integrar a função f(x) = x²',
          })
          .expectStatus(200)
          .expectJsonMatch({
            name: 'Integrar a função f(x) = x²',
          });
      });
    });
    describe('Delete tasks', () => {
      it('should respond bad request when an invalid id is provided', async () => {
        return pactum.spec().delete('/tasks/1').expectStatus(400).expectBody({
          statusCode: 400,
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
        });
      });
      it('should respond not found when a non-existent id is provided', async () => {
        return pactum
          .spec()
          .delete('/tasks/00000000-0000-0000-0000-000000000000')
          .expectStatus(404)
          .expectBody({
            statusCode: 404,
            message:
              'Task with id 00000000-0000-0000-0000-000000000000 not found',
            error: 'Not Found',
          });
      });
      it('should delete the selected course', async () => {
        return pactum
          .spec()
          .delete('/tasks/$S{taskId}')
          .expectStatus(200)
          .expectBody({
            id: '$S{taskId}',
          });
      });
    });
  });
  describe('Activities', () => {
    describe('Create activity', () => {
      it('should respond with bad request when no data is provided', () => {
        return pactum
          .spec()
          .post('/activities')
          .expectStatus(400)
          .expectBody({
            statusCode: 400,
            message: [
              'date must be a valid ISO 8601 date string',
              'date must be a string',
              'scheduledStart must match /^(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})([+-]\\d{2})?$/ regular expression',
              'scheduledStart must be a string',
              'scheduledEnd must match /^(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})([+-]\\d{2})?$/ regular expression',
              'scheduledEnd must be a string',
              'studentCpf must match /^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$/ regular expression',
              'studentCpf must be a string',
              'taskIds must contain at least 1 elements',
              'each value in taskIds must be a UUID',
              'each value in taskIds must be a string',
              'taskIds must be an array',
            ],
            error: 'Bad Request',
          });
      });
      it.todo(
        'should respond with bad request when start and end time interval is too long',
      );
      it.todo(
        'should respond with bad request when end time preceeds start time',
      );
      it('should create an activity', async () => {
        const course = {
          name: 'Cálculo I',
        };
        await pactum
          .spec()
          .post('/courses')
          .withBody(course)
          .stores('courseId', 'id');

        const student = {
          cpf: '012.345.678-90',
          name: 'João da Silva',
          registration: '123456',
          course_id: '$S{courseId}',
        };
        await pactum
          .spec()
          .post('/students')
          .withBody(student)
          .stores('studentCpf', 'cpf');

        const activity = {
          date: '2022-12-31',
          scheduledStart: '2022-12-31 08:00:00',
          scheduledEnd: '2022-12-31 10:00:00',
          studentCpf: '$S{studentCpf}',
          taskIds: ['$S{taskId}'],
        };
        return pactum
          .spec()
          .post('/activities')
          .withBody(activity)
          .expectStatus(201)
          .expectJsonMatch(activity)
          .stores('activityId', 'id');
      });
    });
  });
});
