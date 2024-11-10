import { PrismaClientError } from '../errors/types/prisma-client-error';

// Método que verifica se o erro disparado foi um erro vindo do prisma
export const isPrismaError = (e: PrismaClientError): boolean => {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' || typeof e.meta === 'object')
  );
};
