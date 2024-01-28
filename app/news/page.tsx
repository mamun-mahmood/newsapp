"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";


const Page = () => {
  // const params
  const search = useSearchParams();
  const title = search.get("title");
  const description = search.get("description");
  const urlToImage = search.get("urlToImage");
  return (
    <div>
      <img className="w-full max-h-[500px] object-cover" src={urlToImage} alt={title + "image"} />
      <p className="text-2xl">{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default Page;