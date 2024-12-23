import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { UnauthorizedInterceptor } from './common/interceptors/unauthorized.interceptor';
import { ConflictInterceptor } from './common/interceptors/conflict.interceptor';
import { DatabaseInterceptor } from './common/interceptors/database.interceptor';
import { PrismaValidationInterceptor } from './common/interceptors/prisma_validation.interceptor';
import { NotFoundInterceptor } from './common/interceptors/not_found.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new PrismaValidationInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
