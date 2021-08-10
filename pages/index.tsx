import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';
import Slider from '../components/slider';
import { client } from '../libs/client'
import Image from 'next/image';
import styles from '../styles/index.module.scss'

interface Article {
  id: string,
  title: string,
  image?: CMSImage,
  contents: string,
  createdAt: string,
  publishedAt: string,
  revisedAt: string,
  updatedAt: string,
}

interface ImagesResponse {
  id: string,
  image: CMSImage,
  createdAt: string,
  publishedAt: string,
  revisedAt: string,
  updatedAt: string,
}

interface CMSImage {
  url: string,
  height: number,
  width: number,
}

export default function Home({ news, images }: { news: Array<Article>, images: Array<ImagesResponse> }) {
  return (
    <>
      <Slider>
        {images.map((img) => (
          <SwiperSlide key={img.id} className="text-center">
            <Image src={img.image.url} width={img.image.width} height={img.image.height}></Image>
          </SwiperSlide>
        )) }
      </Slider>
      <div className="news">
        <p>お知らせ</p>
        <ul>
          {news.map((article) => (
            <li key={article.id}>
              <Link href={`/news/${article.id}`}>
                <a className="text-blue-700 flex">
                  <span className={styles.date}>{formatDate(new Date(article.publishedAt))}</span>
                  <span>{article.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const formatDate = (date: Date) => {
  const result = date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日';
  return result;
}

export const getStaticProps = async () => {
  const data: any = await client.get({ endpoint: "news"});
  const imagesData: any = await client.get({ endpoint: "top-slide" });
  return {
    props: {
      news: data.contents,
      images: imagesData.contents,
    },
  }
}