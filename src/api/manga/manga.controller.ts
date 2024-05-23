import { Controller, Get } from '@nestjs/common';
import { MangaService } from './manga.service';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}
  @Get()
  getAllManga() {
    return this.mangaService.getAllManga();
  }
}
