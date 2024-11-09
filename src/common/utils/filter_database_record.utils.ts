import { Prisma, PrismaClient } from '@prisma/client';
import { isValidDatabaseTable } from './is_valid_database_table.utils';

interface IFilterDatabaseRecords {
  prismaClient: PrismaClient;
  databaseTableName: string;
  searchTerm: string;
  limit?: number;
  skip?: number;
  orderBy?: 'asc' | 'desc';
}

// Função para realizar um filtro busca de registros em uma tabela do banco com base em um termo de pesquisa
export async function filterDatabaseRecords<T>({
  prismaClient,
  databaseTableName,
  searchTerm,
  limit = 50,
  skip = 0,
  orderBy = 'asc',
}: IFilterDatabaseRecords): Promise<T[]> {
  if (!isValidDatabaseTable(databaseTableName)) {
    throw new Error('O nome da tabela é inválido');
  }

  const query = await prismaClient.$queryRaw`
    SELECT * FROM ${Prisma.raw(databaseTableName)} 
    WHERE unaccent("name") ILIKE unaccent('%' || ${searchTerm} ||'%')
       OR unaccent("description") ILIKE unaccent('%' || ${searchTerm} || '%')
    ORDER BY "id" ${Prisma.raw(orderBy.toUpperCase())}
    LIMIT ${limit} OFFSET ${skip.toString};
  `;

  const result = await query;

  // Garantir que o resultado é um array
  if (!Array.isArray(result)) {
    throw new Error(
      'Err - filterDatabaseRecords - A consulta não retornou um array',
    );
  }

  return result;
}
