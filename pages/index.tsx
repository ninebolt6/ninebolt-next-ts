import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';
import Slider from '../components/slider';
import { client } from 'libs/client'
import Image from 'next/image';
import styles from '../styles/index.module.scss'
import { Article, ArticleData, ImagesResponse, CMSImage } from 'libs/types';
import { formatDate } from 'libs/date';


export default function Home({ news, images }: { news: Array<Article>, images: Array<ImagesResponse> }) {
  return (
    <>
      <Slider>
        {images.map((img) => (
          <SwiperSlide key={img.id} className="text-center">
            <Image src={img.image.url} width={img.image.width} height={img.image.height} alt={img.alt ? img.alt : "image"}></Image>
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

export const getStaticProps = async () => {
  const data = await client.getList<ArticleData>({ endpoint: "news" });
  const imagesData = await client.getList<CMSImage>({ endpoint: "top-slide" });
  return {
    props: {
      news: data.contents,
      images: imagesData.contents,
    },
  }
}