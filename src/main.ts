import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //horario de brasilia
  process.env.TZ = '-03:00';

  // biblioteca validacao
  app.useGlobalPipes(new ValidationPipe());

  // quem acessa ou nao a aplicacao
  app.enableCors();

  //variavel ambiente port4000
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
