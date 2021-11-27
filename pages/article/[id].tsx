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
import LichImage from 'components/lichImage';

export default function Content({ article }: { article: Article }) {
  return (
    <>
      <article className="mx-2">
        <div className="md:flex bg-indigo-50 p-2 shadow-lg rounded-lg text-center">
          { article.image === undefined ? null : <Image src={article.image.url} width={article.image.width/3} height={article.image.height/3} alt="サムネイル"></Image> }
          <div className="mx-2 md:w-2/3 text-left">
            <div className="flex">
              <Link href={`/category/${article.category.id}`}><a className="text-xs md:text-base px-1 md:mr-2 bg-white rounded-lg">{ article.category.categoryName }</a></Link>
              { article.isUpdated ? 
                <>
                  <img src="/published.svg" width={18} height={18} alt=""/>
                  <p className="text-xs md:text-base mr-2">{formatDate(new Date(article.publishedAt))}</p>
                  <img src="/updated.svg" width={18} height={18} alt=""/>
                  <p className="text-xs md:text-base"><time dateTime={convertTimeToJST(article.updatedAt)}>{formatDate(new Date(article.updatedAt))}</time></p>
                </>
                  : 
                <>
                  <img src="/published.svg" width={18} height={18} alt=""/>
                  <p className="text-xs md:text-base"><time dateTime={convertTimeToJST(article.publishedAt)}>{formatDate(new Date(article.publishedAt))}</time></p>
                </>
              }
            </div>
            <h1 className="md:text-xl font-bold">{article.title}</h1>
            <p className="text-sm md:text-base">{article.description}</p>
          </div>
        </div>
        { ShareButton(article) }
        <div className={styles.contents}>
          { processor.processSync(article.body).result }
        </div>
        { ShareButton(article) }
      </article>
      <div>
        <hr/>
        <p className="my-2 text-center">関連記事</p>
        <ul className="justify-center flex flex-wrap">
          {article.relatedArticles.map((article) => (
            <li key={article.id} className="m-2 w-5/12">
              <Link href={`/article/${article.id}`}>
                <a className="block bg-indigo-50 p-2 shadow-md rounded-lg text-center">
                  <div className="">
                    { article.image === undefined ? null : 
                      <Image src={article.image.url} width={article.image.width/5} height={article.image.height/5} alt="サムネイル" className="md:mx-1"></Image>
                    }
                    <div className="mx-2 text-left">
                      <div className="flex">
                        { article.isUpdated ? 
                          <>
                            <div className="hidden md:flex mr-2">
                              <img src="/published.svg" width={18} height={18} alt=""/>
                              <p className="text-xs md:text-base">{formatDate(new Date(article.publishedAt))}</p>
                            </div>
                            <img src="/updated.svg" width={18} height={18} alt=""/>
                            <p className="text-xs md:text-base"><time dateTime={convertTimeToJST(article.updatedAt)}>{formatDate(new Date(article.updatedAt))}</time></p>
                          </>
                            : 
                          <>
                            <img src="/published.svg" width={18} height={18} alt=""/>
                            <p className="text-xs md:text-base"><time dateTime={convertTimeToJST(article.publishedAt)}>{formatDate(new Date(article.publishedAt))}</time></p>
                          </>
                        }
                      </div>
                      <p className="text-sm md:text-xl md:font-bold">{article.title}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const processor = unified().use(rehypeParse, { fragment: true }).use(rehypeHighlight).use(rehypeReact, {
  createElement: React.createElement,
  components: {
    //img: (props: any) => <a href={`${props.src}?auto=format`} target="_blank" rel="noopener noreferrer"><Image {...props} /></a>,
    img: LichImage,
  },
});

const ShareButton = (article: Article) => {
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