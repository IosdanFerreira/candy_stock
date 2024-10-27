import { DatabaseError } from '../errors/types/database-error';
import { PrismaClientError } from '../errors/types/prisma-client-error';
import { UniqueConstraintError } from '../errors/types/unique-constraint-error';

// Enum que deve armazenar todos os tipos de erro Prisma que serão observados na aplicação
enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

// Método que define qual exceção vai ser disparada dependendo do código do erro Prisma
export const handleDatabaseErrors = (e: PrismaClientError) => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new DatabaseError(e.message);
  }
};
