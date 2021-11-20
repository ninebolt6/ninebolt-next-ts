import React from "react";
import { client } from 'libs/client';
import { convertTimeToJST, formatDate } from 'libs/date';
import { Article, ArticleData } from 'libs/types'
import Image from 'next/image';
import { unified } from "unified";
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import styles from 'styles/article.module.scss';

export default function Content({ article }: { article: Article }) {
  return (
    <div className="mx-2">
      <div className="md:flex bg-indigo-50 p-2 shadow-lg rounded-lg">
        { article.image === undefined ? null : <Image src={article.image.url} width={article.image.width/3} height={article.image.height/3}></Image> }
        <div className="mx-2 md:w-2/3">
          <p><time dateTime={convertTimeToJST(article.publishedAt)}>{formatDate(new Date(article.publishedAt))}</time></p>
          <h1 className="text-xl font-bold">{article.title}</h1>
          <p>{article.description}</p>
        </div>
      </div>
      { shareButton(article) }
      <article className={styles.contents}>
        { processor.processSync(article.body).result }
      </article>
      { shareButton(article) }
    </div>
  );
}

const processor = unified().use(rehypeParse, { fragment: true }).use(rehypeHighlight).use(rehypeReact, {
  createElement: React.createElement,
  components: {
    img: (props: any) => <Image {...props} />,
  },
});

const shareButton = (article: Article) => {
  return (
  <div className="text-center my-4">
    <button className="rounded-md border-2 p-2" onClick={() => copyInfoToClipboard(article)}>
      <a>記事情報をクリップボードにコピー</a>
    </button>
  </div>
  )
}

const copyInfoToClipboard = (article: Article) => {
  const text = `${article.title} - Ninebolt\nhttps://ninebolt.net/article/${article.id}`;

  navigator.clipboard.writeText(text)
  .then(() => {
    // success
  }, (err) => {
    // error
  });
}

export const getStaticPaths = async() => {
  const data: any = await client.get({ endpoint: "articles" });
  const paths = data.contents.map((content: Article) => `/article/${content.id}`);

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await client.getListDetail<ArticleData>({ endpoint: "articles", contentId: id});
  return {
    props: {
      article: res,
    },
  };
}