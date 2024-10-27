import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { handleDatabaseErrors } from '../utils/handle-database-error.utils';
import { isPrismaError } from '../utils/is-prisma-error.utils';
import { DatabaseError } from '../errors/types/database-error';
@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (isPrismaError(error)) {
          error = handleDatabaseErrors(error);
        }
        if (error instanceof DatabaseError) {
          console.error(error);
          throw new BadRequestException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
