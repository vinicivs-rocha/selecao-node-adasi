import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('Sistema de agendamento de atividades')
    .setDescription(
      'API RESTful em Node.js para gerenciar cursos, estudantes, tarefas e atividades, incluindo funcionalidades específicas de agendamento de atividades, seguindo regras de negócio precisas.',
    )
    .setVersion('1.0')
    .addTag('courses')
    .setBasePath('v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    url: 'http://localhost:3000/',
  });

  await app.listen(3000);
}
bootstrap();
