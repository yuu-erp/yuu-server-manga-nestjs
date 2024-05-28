import { Controller, Get, Req } from '@nestjs/common';
import { ImageSourceService } from './image-source.service';
import { getImageSourceDto } from './dto/get-image-source.dto';
import { Request } from 'express';
@Controller('images')
export class ImageSourceController {
  constructor(private readonly imageSourceService: ImageSourceService) {}
  @Get()
  async getImageSource(@Req() request: Request): Promise<getImageSourceDto> {
    const imageSourceDto = request.query as unknown as getImageSourceDto;
    return await this.imageSourceService.getImageSource(
      imageSourceDto,
      request,
    );
  }
}
