import { Prisma, PrismaClient } from '@prisma/client';
import { isValidDatabaseTable } from './is_valid_database_table.utils';

interface IFilterDatabaseRecordsCount {
  prismaClient: PrismaClient;
  databaseTableName: string;
  searchTerm: string;
}

export async function filterDatabaseRecordsCount({
  prismaClient,
  databaseTableName,
  searchTerm,
}: IFilterDatabaseRecordsCount): Promise<number> {
  if (!isValidDatabaseTable(databaseTableName)) {
    throw new Error('O nome da tabela é inválido');
  }

  const query = await prismaClient.$queryRaw<{ count: number }[]>`
    SELECT COUNT(*) as count FROM ${Prisma.raw(databaseTableName)}
    WHERE unaccent("name") ILIKE unaccent('%' || ${searchTerm} || '%')
       OR unaccent("description") ILIKE unaccent('%' || ${searchTerm} || '%');
  `;

  const result: number = Number(query[0]?.count || 0);

  return result;
}
