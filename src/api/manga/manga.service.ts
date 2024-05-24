import { LoggerService } from '@/services/loggerService/logger.service';
import { PrismaService } from '@/services/prismaService/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MangaService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly prismaService: PrismaService,
  ) {}
  async getAll() {
    try {
      const mangaSources = await this.prismaService.manga_source.findMany();
      return {
        data: mangaSources,
      };
    } catch (err) {
      this.loggerService.error(err);
      throw new Error('Failed to fetch manga sources');
    }
  }

  async getMangaById(id: string) {
    try {
      const manga = await this.prismaService.manga_source.findUnique({
        where: { id },
      });

      return {
        data: manga,
      };
    } catch (err) {
      this.loggerService.error(err);
      throw new Error('Failed to fetch manga sources');
    }
  }
}
