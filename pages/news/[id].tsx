import { client } from '../../libs/client';

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

export default function Content({ article }: {article: Article}) {
  return (
    <article>
      <h1>{article.title}</h1>
      <p><time dateTime={convertTimeToJST(article.publishedAt)}>{formatDate(new Date(article.publishedAt))}</time></p>
      <br/>
      <div
        dangerouslySetInnerHTML={{
          __html: `${article.contents}`,
        }}
        className="main-contents"/>
    </article>
  );
}

const convertTimeToJST = (date: string) => {
  const result = date.substring(0, date.length-1) + '+09:00';
  return result;
}

const formatDate = (date: Date) => {
  const result = date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日';
  return result;
}


export const getStaticPaths = async() => {
  const data: any = await client.get({ endpoint: "news"});
  const paths = data.contents.map((content: Article) => `/news/${content.id}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "news", contentId: id});

  return {
    props: {
      article: data,
    },
  };
};