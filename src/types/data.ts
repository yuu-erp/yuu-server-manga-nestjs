import { Request } from 'express';

export interface Proxy {
  ignoreReqHeaders?: boolean;
  followRedirect?: boolean;
  redirectWithProxy?: boolean;
  decompress?: boolean;
  appendReqHeaders?: Record<string, string>;
  appendResHeaders?: Record<string, string>;
  deleteReqHeaders?: string[];
  deleteResHeaders?: string[];
}
export type GetImagesQuery = {
  source_id: string;
  source_media_id: string;
  chapter_id: string;
  request: Request;
};
export type ImageSource = {
  image: string;
  useProxy?: boolean;
  proxy?: Proxy;
};
