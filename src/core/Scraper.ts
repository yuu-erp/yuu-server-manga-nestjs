import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequireAtLeastOne } from '@/types/utils';
import axiosRetry from 'axios-retry';
import { Proxy } from '@/types/data';
import Monitor from './Monitor';

export default class Scraper {
  client: AxiosInstance;
  baseURL: string;
  id: string;
  name: string;
  blacklistTitles: string[];
  scrapingPages: number;
  proxy: Proxy;
  monitor: Monitor;
  locales: string[];
  constructor(
    id: string,
    name: string,
    axiosConfig: RequireAtLeastOne<AxiosRequestConfig, 'baseURL'>,
  ) {
    const config = {
      headers: {
        referer: axiosConfig.baseURL,
        origin: axiosConfig.baseURL,
      },
      timeout: 20000,
      ...axiosConfig,
    };
    this.client = axios.create(config);
    this.baseURL = axiosConfig.baseURL;

    const defaultMonitorRequest = async () => {
      console.log('defaultMonitorRequest');
      const { data } = await this.client.get('/');
      return data;
    };
    this.monitor = new Monitor(
      defaultMonitorRequest,
      this.shouldMonitorChange.bind(this),
    );

    this.id = id;
    this.name = name;
    this.blacklistTitles = ['live action'];
    this.scrapingPages = 2;

    axiosRetry(this.client, { retries: 3 });

    const axiosErrorLogger = (error: AxiosError) => {
      // return this.loggerDiscord.logError(error);
      return error;
    };

    this.client.interceptors.request.use((config) => config, axiosErrorLogger);

    this.client.interceptors.response.use(
      (response) => response,
      axiosErrorLogger,
    );
  }
  /**
   * The monitor will run this method to check if the monitor should run onChange
   * (defined in cron/fetch)
   * @param oldPage old page that the monitor requested before
   * @param newPage new page that the monitor just requested
   * @returns boolean to let the monitor decided if the onChange function should run.
   */
  shouldMonitorChange(_oldPage: any, _newPage: any): boolean {
    return false;
  }
}
