import Scraper from './Scraper';
import { MediaType } from '@/types/anilist';
import { AxiosRequestConfig } from 'axios';
import { RequireAtLeastOne } from '../types/utils';
import { GetImagesQuery, ImageSource } from '@/types/data';
export default class MangaScraper extends Scraper {
  type: MediaType.Manga;
  monitorURL: string;

  constructor(
    id: string,
    name: string,
    axiosConfig: RequireAtLeastOne<AxiosRequestConfig, 'baseURL'>,
  ) {
    super(id, name, axiosConfig);

    this.id = id;
    this.name = name;
    this.monitorURL = axiosConfig.baseURL;
    this.type = MediaType.Manga;
  }

  async getImages(_ids: GetImagesQuery): Promise<ImageSource[]> {
    throw new Error('getImagesNot implemented');
  }
}
