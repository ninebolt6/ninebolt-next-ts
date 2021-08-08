import Link from 'next/link';
import { client } from '../libs/client'

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

export default function Home({ news }: {news: Array<Article>}) {
  return (
    <div>
      <ul>
        {news.map((article) => (
          <li key={article.id}>
            <Link href={`/news/${article.id}`}>
              <a className="text-blue-700">{article.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const data: any = await client.get({ endpoint: "news"});

  return {
    props: {
      news: data.contents,
    },
  }
}