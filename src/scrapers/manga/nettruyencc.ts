import cheerio from 'cheerio';
import MangaScraper from '@/core/MangaScraper';
import { GetImagesQuery } from '@/types/data';

export default class NettruyenScraper extends MangaScraper {
  constructor() {
    // Pass axiosConfig to the parent class
    super('nettruyencc', 'Nettruyencc', {
      baseURL: 'https://nettruyencc.com',
    });
    // Languages that the source supports (Two letter code)
    // See more: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    this.locales = ['vi'];
    this.monitor.interval = 20 * 60 * 1000; // 20 minutes
  }

  async getImages(query: GetImagesQuery) {
    const { source_media_id, chapter_id } = query;

    const { data } = await this.client.get(
      `/truyen-tranh/${source_media_id}/chap-0/${chapter_id}`,
    );

    return this.composeImages(data);
  }

  composeImages(html: string) {
    const $ = cheerio.load(html);

    const images = $('.page-chapter');

    return images.toArray().map((el) => {
      const imageEl = $(el).find('img');
      const source = imageEl.data('original') as string;

      const protocols = ['http', 'https'];

      const image = protocols.some((protocol) => source.includes(protocol))
        ? source
        : `https:${source}`;

      return {
        image,
        useProxy: true,
      };
    });
  }
}
