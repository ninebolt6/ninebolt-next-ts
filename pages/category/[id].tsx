import { client } from "libs/client";
import { Article, ArticleData, Category } from "libs/types";
import Link from 'next/link';
import Image from 'next/image';
import { formatDate, convertTimeToJST } from "libs/date";

export default function CategoryList({ articles, categoryName }: { articles: Array<Article>, categoryName: string }) {
  return (
    <>
      <p className="text-center">カテゴリ {categoryName} の記事一覧</p>
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

export const getStaticPaths = async (context: any) => {
  const data = await client.getList<ArticleData>({
    endpoint: "articles",
    queries: {
      fields: 'category.id',
    },
  });
  const paths = data.contents.map((content) => `/category/${content.category.id}`);

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await client.getList<ArticleData>({
    endpoint: "articles",
    queries: {
      filters: `category[equals]${id}`,
      fields: 'id,title,description,category.categoryName,image,isUpdated,publishedAt,updatedAt',
    },
  });
  return {
    props: {
      articles: res.contents,
      categoryName: res.contents[0].category.categoryName,
    },
  };
}