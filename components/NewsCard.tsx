import Link from 'next/link';
import { FC } from 'react';

interface NewsCardProps {
    title: string;
    description: string;
    urlToImage: string;
    publishedAt: string;
}


const NewsCard: FC<NewsCardProps> = ({
    title = "Title",
    description = "Description",
    urlToImage = "https://images.unsplash.com/photo-1622838177194-8b9b7b0b5b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Yml0Y29pbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    publishedAt = "2021-06-05T12:00:00Z",
}
) => {
    return (
        <Link href={
            {
                pathname: '/news',
                query: { title, description, urlToImage, publishedAt },
            }

        } className="flex flex-col items-center p-4 cursor-pointer bg-slate-800 rounded-md hover:opacity-40 " >
            <img
                className="rounded-xl"
                src={urlToImage}
                alt="Picture of the author"
                width={500}
                height={500}
            />
            <p className="text-sm font-bold" >{new Date(publishedAt || "").toLocaleString()}</p>
            <h1 className="text-2xl">{title}</h1>
            {/* <p>{description}</p> */}
        </Link>
    );
};

export default NewsCard;