import Link from 'next/link';
import { FC } from 'react';

interface NewsCardProps {
    title: string;
    description: string;
    urlToImage: string;
}


const NewsCard: FC<NewsCardProps> = ({
    title,
    description,
    urlToImage
}
) => {
    return (
        <Link href={
            {
                pathname: '/news',
                query: { title: title, description: description, urlToImage: urlToImage},
            }

        } className="flex flex-col items-center justify-center p-4 cursor-pointer" >
            <img
                className="rounded-xl"
                src={urlToImage}
                alt="Picture of the author"
                width={500}
                height={500}
            />
            <h1 className="text-2xl">{title}</h1>
            <p>{description}</p>
        </Link>
    );
};

export default NewsCard;