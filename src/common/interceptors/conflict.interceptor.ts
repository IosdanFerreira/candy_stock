import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ConflictError } from '../errors/types/conflict-error';
@Injectable()
export class ConflictInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ConflictError) {
          console.error(error);
          throw new ConflictException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
