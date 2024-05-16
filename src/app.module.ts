import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@/config/app.config';
import { ImageSourceModule } from '@/image-source/image-source.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    ImageSourceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
