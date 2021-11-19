import { client } from 'libs/client';
import { convertTimeToJST, formatDate } from 'libs/date';
import { Article, ArticleData } from 'libs/types'
import Image from 'next/image';

export default function Content({ article }: {article: Article}) {
  return (
    <article>
      <p><time dateTime={convertTimeToJST(article.publishedAt)}>{formatDate(new Date(article.publishedAt))}</time></p>
      <h1>{article.title}</h1>
      { article.image === undefined ? null : <Image src={article.image.url} width={article.image.width} height={article.image.height}></Image> }
      <br/>
      <div
        dangerouslySetInnerHTML={{
          __html: `${article.contents}`,
        }}
        className="main-contents"/>
    </article>
  );
}

export const getStaticPaths = async() => {
  const data: any = await client.get({ endpoint: "news"});
  const paths = data.contents.map((content: Article) => `/news/${content.id}`);

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.getListDetail<ArticleData>({ endpoint: "news", contentId: id});

  return {
    props: {
      title: data.title,
      article: data,
    },
  };
}