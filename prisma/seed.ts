// src/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Exemplo de criação de usuários
  await prisma.role.create({
    data: {
      role_name: 'Administrador',
    },
  });

  await prisma.role.create({
    data: {
      role_name: 'Vendedor',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
