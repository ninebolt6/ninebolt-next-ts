import Link from 'next/link';
import { client } from 'libs/client'
import { Article, ArticleData } from 'libs/types';
import { convertTimeToJST, formatDate } from 'libs/date';
import Image from 'next/image';


export default function Home({ articles }: { articles: Array<Article> }) {
  return (
    <>
      <p className="text-center">記事一覧</p>
      <ul className="justify-center flex flex-wrap">
        {articles.map((article) => (
          <li key={article.id} className="m-2 w-5/12 md:w-auto">
            <Link href={`/article/${article.id}`}>
              <a className="block bg-indigo-50 p-2 shadow-md rounded-lg text-center">
                <div className="md:flex">
                  { article.image === undefined ? null : 
                    <Image src={article.image.url} width={article.image.width/5} height={article.image.height/5} alt="サムネイル" className="md:mx-1"></Image>
                  }
                  <div className="md:mx-2 md:w-2/3 text-left">
                    <div className="flex">
                      <p className="text-xs md:text-base px-1 md:mr-2 bg-white rounded-lg">{ article.category.categoryName }</p>
                      { article.isUpdated ? 
                        <>
                          <div className="hidden md:flex mr-2">
                            <img src="/published.svg" width={18} height={18} alt="" />
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
                    <h2 className="text-sm md:text-xl md:font-bold">{article.title}</h2>
                    <p className="hidden md:block">{article.description}</p>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await client.getList<ArticleData>({
    endpoint: "articles",
    queries: {
      fields: 'id,title,description,category.categoryName,image,isUpdated,publishedAt,updatedAt',
    }
  });
  return {
    props: {
      articles: res.contents,
    },
  }
}