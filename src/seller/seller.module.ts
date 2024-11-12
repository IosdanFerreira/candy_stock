import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SellerRepository } from './repositories/seller.repository';

@Module({
  controllers: [SellerController],
  providers: [SellerService, PrismaService, SellerRepository],
})
export class SellerModule {}
