import NewsContainer from "@/components/NewsContainer";
export const getNews = async () => {
  const res = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)
  const data = await res.json()
  return (data)
}
export default async function Home() {
  const { articles = [] } = await getNews() || {}
const viewMode = "grid"
  return (
    <main className="min-h-screen  flex flex-col items-center  ">
      <section className="max-w-screen-2xl">
     <NewsContainer articles={articles} />
     </section>
    </main>
  );
}
