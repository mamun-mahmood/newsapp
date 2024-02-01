import { db } from '@/firebase/firebase.config';
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
interface NewsCardProps {
    title: string;
    description: string;
    urlToImage: string;
    publishedAt: string;
    user: any;
    favorites: any;
}


const NewsCard: FC<NewsCardProps> = ({
    title = "Title",
    description = "Description",
    urlToImage = "https://images.unsplash.com/photo-1622838177194-8b9b7b0b5b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Yml0Y29pbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    publishedAt = "2021-06-05T12:00:00Z",
    user,
    favorites
}
) => {

    const [isFavorite, setIsFavorite] = useState(false)
    const handleAddToFavorite = () => {
        const docRef = doc(db, "newsapp-favorites", user.uid);
        // console.log('docRef', docRef);
        if (!favorites[0].exists) {
            setDoc(docRef, {
                titles: [title]
            });
            setIsFavorite(true)
        }
        else {
            updateDoc(docRef, {
                titles: arrayUnion(title)
            });
            setIsFavorite(true)
        }
    }
    const handleRemoveFromFavorite = () => {
        const docRef = doc(db, "newsapp-favorites", user.uid);
        if (docRef) {
            updateDoc(docRef, {
                titles: arrayRemove(title)
            });
            setIsFavorite(false)
        }
    }
    const hanleClick = () => {
        if (isFavorite) {
            handleRemoveFromFavorite()
        } else {
            handleAddToFavorite()
        }
    }
    useEffect(() => {
        if (title) {
            favorites.includes(title)
                ? setIsFavorite(true)
                : setIsFavorite(false)
        }
    }, [favorites, title])
    return (
        <div className="w-[384px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg " src={urlToImage} alt="" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">{title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{description}</p>
                <div className='flex justify-between items-center w-full'>
                    <Link href={
                        {
                            pathname: '/news',
                            query: { title, description, urlToImage, publishedAt },
                        }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                    <p className="text-sm font-bold " >{new Date(publishedAt || "").toLocaleString()}</p>
                    <button title={isFavorite ? "Remove Favourite" : "Add Favourite"} onClick={hanleClick} className="bg-slate-100 text-white font-bold px-1 rounded w-12 ">
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default NewsCard;