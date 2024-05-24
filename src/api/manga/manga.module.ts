import { Module } from '@nestjs/common';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { LoggerService } from '@/services/loggerService/logger.service';
import { PrismaService } from '@/services/prismaService/prisma.service';

@Module({
  imports: [],
  controllers: [MangaController],
  providers: [MangaService, LoggerService, PrismaService],
  exports: [],
})
export class MangaModule {}
