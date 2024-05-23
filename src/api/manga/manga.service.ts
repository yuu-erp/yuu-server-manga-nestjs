import { Injectable } from '@nestjs/common';
@Injectable()
export class MangaService {
  constructor() {}
  async getAllManga() {
    console.log('Get All Manga!');
  }
}
