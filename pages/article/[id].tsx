import React, { useState } from "react";
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
import Link from "next/link";

export default function Content({ article }: { article: Article }) {
  return (
    <article className="mx-2">
      <div className="md:flex bg-indigo-50 p-2 shadow-lg rounded-lg text-center">
        { article.image === undefined ? null : <Image src={article.image.url} width={article.image.width/3} height={article.image.height/3}></Image> }
        <div className="mx-2 md:w-2/3 text-left">
          <div className="flex">
            <Link href={`/category/${article.category.id}`}><a className="text-xs md:text-base px-1 md:mr-2 bg-white rounded-lg">{ article.category.categoryName }</a></Link>
            { article.isUpdated ? 
              <>
                <Image src="/published.svg" width={18} height={18}></Image>
                <p className="text-xs md:text-base mr-2">{formatDate(new Date(article.publishedAt))}</p>
                <Image src="/updated.svg" width={18} height={18}></Image>
                <p className="text-xs md:text-base"><time dateTime={convertTimeToJST(article.updatedAt)}>{formatDate(new Date(article.updatedAt))}</time></p>
              </>
                : 
              <>
                <Image src="/published.svg" width={18} height={18}></Image>
                <p className="text-xs md:text-base"><time dateTime={convertTimeToJST(article.publishedAt)}>{formatDate(new Date(article.publishedAt))}</time></p>
              </>
            }
          </div>
          <h1 className="md:text-xl font-bold">{article.title}</h1>
          <p className="text-sm md:text-base">{article.description}</p>
        </div>
      </div>
      { shareButton(article) }
      <div className={styles.contents}>
        { processor.processSync(article.body).result }
      </div>
      { shareButton(article) }
    </article>
  );
}

const processor = unified().use(rehypeParse, { fragment: true }).use(rehypeHighlight).use(rehypeReact, {
  createElement: React.createElement,
  components: {
    img: (props: any) => <Image {...props} />,
  },
});

const shareButton = (article: Article) => {
  const [copyStatus, setCopyStatus] = useState('記事情報をクリップボードにコピー');
  return (
    <div className="text-center my-4">
      <button className="rounded-md border-2 p-2" onClick={() => {
        copyInfoToClipboard(article).then(() => {
          setCopyStatus('コピーしました');
        }, (err) => {
          setCopyStatus('コピーに失敗しました');
        });
      }}>
        <a>{copyStatus}</a>
      </button>
    </div>
  )
}

const copyInfoToClipboard = (article: Article) => {
  const text = `${article.title} - Ninebolt\nhttps://ninebolt.net/article/${article.id}`;

  return navigator.clipboard.writeText(text);
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
  const res = await client.getListDetail<ArticleData>({
    endpoint: "articles",
    contentId: id,
  });
  return {
    props: {
      article: res,
    },
  };
}