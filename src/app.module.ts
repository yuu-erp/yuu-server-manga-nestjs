import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@/config/app.config';
import { MangaModule } from './api/manga/manga.module';
import { ImageSourceModule } from './api/image-source/image-source.module';
import { PrismaModule } from './services/prismaService/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    PrismaModule,
    ImageSourceModule,
    MangaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
