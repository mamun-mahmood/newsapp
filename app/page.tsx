import NewsContainer from "@/components/NewsContainer";

export default async function Home() {
  const getNews = async () => {
    const res = await fetch(`https://newsapi.org/v2/everything?q=elonmusk&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)
    const data = await res.json()
    return (data)
  }
  const { articles = [] } = await getNews() || {}

  return (
    <main className="min-h-screen flex flex-col items-center ">
      <section className="max-w-screen-md w-full">
        <NewsContainer articles={articles} />
        <footer className="flex justify-between items-center space-x-4 mb-2">
          {/* copyright */}
          <p className="text-sm font-bold">© 2024 NewsApp</p>
          {/* developer */}
          <a href="https://github.com/mamun-mahmood/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold">Developed by Mamun Mahmood</a>
        </footer>
      </section>
    </main>
  );
}
