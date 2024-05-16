import { AllConfigType } from '@/config/config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getImageSourceDto } from './dto/get-image-source.dto';
@Injectable()
export class ImageSourceService {
  constructor(private configService: ConfigService<AllConfigType>) {}
  async getImageSource(imageSource: getImageSourceDto) {
    const { source_id, source_media_id, chapter_id } = imageSource;
    console.log('Hello Yuu - manga - Image Source!', imageSource);
    if (!source_id) {
      // handle error 400 with message Missing "required query parameters"
    }

    return {
      ...imageSource,
    };
  }
}
