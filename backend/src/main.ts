import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config()

async function bootstrap() {
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
    }

  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
