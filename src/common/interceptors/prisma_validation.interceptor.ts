import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: any) => {
        if (error instanceof PrismaClientValidationError) {
          console.error(error);
          throw new BadRequestException('Erro de validação no banco de dados');
        } else {
          throw error;
        }
      }),
    );
  }
}
