import { AllConfigType } from '@/config/config.type';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getImageSourceDto } from './dto/get-image-source.dto';
import NettruyenScraper from '@/scrapers/manga/nettruyencc';
import { Request } from 'express';

@Injectable()
export class ImageSourceService {
  constructor(
    private configService: ConfigService<AllConfigType>,
    private nettruyenScraper: NettruyenScraper,
  ) {}
  async getImageSource(imageSource: getImageSourceDto, req: Request) {
    const { source_id, source_media_id, chapter_id } = imageSource;
    console.log('Hello Yuu - manga - Image Source!', imageSource);
    if (!source_id) {
      throw new UnprocessableEntityException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          message: 'Missing required query parameters',
        },
      });
    }

    const images = await this.nettruyenScraper.getImages({
      chapter_id,
      source_id,
      source_media_id,
      request: req,
    });

    return {
      ...imageSource,
    };
  }
}
