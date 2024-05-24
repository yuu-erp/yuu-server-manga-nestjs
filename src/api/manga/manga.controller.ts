import { Controller, Get, Req } from '@nestjs/common';
import { MangaService } from './manga.service';
import { Request } from 'express';
@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}
  @Get()
  getAllManga() {
    return this.mangaService.getAll();
  }

  @Get(':id')
  getMangaById(@Req() request: Request) {
    const { id } = request.params;
    return this.mangaService.getMangaById(id);
  }
}
