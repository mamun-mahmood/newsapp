import NewsCard from "@/components/NewsCard";
export const getNews = async () => {
  const res = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)
  const data = await res.json()
  return (data)
}
export default async function Home() {

  const { articles = [] } = await getNews() || {}
  return (
    <main className="flex min-h-screen max-w-screen-2xl flex-col items-center justify-between p-24">
      <div className="grid grid-cols-5">
        {articles.map((article: any, idx: number) => (
          <NewsCard key={idx} title={article.title} description={article.description} urlToImage={article.urlToImage} />
        ))}

      </div>
    </main>
  );
}
