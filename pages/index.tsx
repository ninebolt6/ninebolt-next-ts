import Link from 'next/link';
import { client } from '../libs/client'
import styles from '../styles/index.module.scss'

interface Article {
  id: string,
  title: string,
  image: string,
  contents: string,
  createdAt: string,
  publishedAt: string,
  revisedAt: string,
  updatedAt: string,
}

export default function Home({ news }: { news: Array<Article> }) {
  return (
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
  );
}

const formatDate = (date: Date) => {
  const result = date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日';
  return result;
}

export const getStaticProps = async () => {
  const data: any = await client.get({ endpoint: "news"});

  return {
    props: {
      news: data.contents,
    },
  }
}