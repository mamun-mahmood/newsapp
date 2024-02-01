"use client"
import { useSearchParams } from "next/navigation";
const Page = () => {
  const search = useSearchParams();
  const title = search.get("title") as string;
  const description = search.get("description") as string;
  const urlToImage = search.get("urlToImage") as string;
  const publishedAt = search.get("publishedAt") as string;
  return (
    <div>
      <img className="w-full max-h-[500px] object-cover" src={urlToImage} alt={title + "image"} />
      <p className="text-sm text-center font-bold">{new Date(publishedAt || "").toLocaleString() }</p>
      <p className="text-2xl">{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default Page;