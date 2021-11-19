import Link from 'next/link';
import { client } from 'libs/client'
import styles from '../styles/index.module.scss'
import { Article, ArticleData } from 'libs/types';
import { formatDate } from 'libs/date';


export default function Home({ articles }: { articles: Array<Article> }) {
  return (
    <>
      <div className="news">
        <p>お知らせ</p>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <Link href={`/article/${article.id}`}>
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
  const data = await client.getList<ArticleData>({ endpoint: "articles" });
  return {
    props: {
      articles: data.contents,
    },
  }
}