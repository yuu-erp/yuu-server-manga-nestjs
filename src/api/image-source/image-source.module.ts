import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageSourceService } from './image-source.service';
import { ImageSourceController } from './image-source.controller';

@Module({
  imports: [ConfigModule],
  providers: [ImageSourceService],
  exports: [],
  controllers: [ImageSourceController],
})
export class ImageSourceModule {}
