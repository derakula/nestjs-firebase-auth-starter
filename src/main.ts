import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors
  app.enableCors();

  // Request Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger API Documentation
  const options = new DocumentBuilder()
    .setTitle('NestJS Starter Kit by @derakula')
    .setDescription('NestJS TypeORM Firebase auth')
    .setVersion('0.0.1')
    .addTag('auth')
    .addTag('users')
    // You can add new tags for your controllers here
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/client', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
