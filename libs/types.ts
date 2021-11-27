import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

export type Article = ArticleData & MicroCMSContentId & MicroCMSDate;
export type Category = CategoryData & MicroCMSContentId & MicroCMSDate;
export type Tag = TagData & MicroCMSContentId & MicroCMSDate;

export interface ArticleData {
  title: string,
  description: string,
  category: Category,
  image?: ImageData,
  tags: Array<Tag>,
  isUpdated: boolean,
  body: string,
  relatedArticles: Array<Article>,
}

export interface ImageData {
  url: string,
  height: number,
  width: number,
}

export interface CategoryData {
  categoryName: string,
}

export interface TagData {
  tagName: string,
}