import { Controller, Get, Req } from '@nestjs/common';
import { ImageSourceService } from './image-source.service';
import { Request } from 'express';
import { getImageSourceDto } from './dto/get-image-source.dto';

@Controller('images')
export class ImageSourceController {
  constructor(private readonly imageSourceService: ImageSourceService) {}
  @Get()
  async getImageSource(@Req() request: Request): Promise<getImageSourceDto> {
    const imageSourceDto = request.query as unknown as getImageSourceDto;
    return await this.imageSourceService.getImageSource(imageSourceDto);
  }
}
