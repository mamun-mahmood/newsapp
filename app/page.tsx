import NewsContainer from "@/components/NewsContainer";
export default function Home() {
  return (
    <main className="min-h-screen  flex flex-col items-center  ">
      <section className="max-w-screen-2xl">
        <NewsContainer />
      </section>
    </main>
  );
}
