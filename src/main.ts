import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule , { cors: true });
  app.useGlobalPipes(new ValidationPipe()); // ✅ Enable validation
  app.enableCors();
  await app.listen(process.env.PORT? process.env.PORT : 8000);
}
bootstrap();
