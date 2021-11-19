import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

export type Article = ArticleData & MicroCMSContentId & MicroCMSDate;

export interface ArticleData {
  title: string,
  image?: CMSImage,
  contents: string,
}

export interface ImagesResponse {
  id: string,
  image: CMSImage,
  alt?: string,
  createdAt: string,
  publishedAt: string,
  revisedAt: string,
  updatedAt: string,
}

export interface CMSImage {
  url: string,
  height: number,
  width: number,
}