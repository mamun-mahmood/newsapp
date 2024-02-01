import { db } from '@/firebase/firebase.config';
import { addDoc, doc, setDoc, updateDoc, arrayRemove, arrayUnion, } from 'firebase/firestore';
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
        <div className="h-[400px] max-w-[400px] flex flex-col items-center p-4  bg-slate-800 rounded-md" >
            <img
                className="rounded-xl"
                src={urlToImage}
                alt="Picture of the author"
                width={500}
            />
            <div className='flex justify-between items-center w-full'>
                <p className="text-sm font-bold " >{new Date(publishedAt || "").toLocaleString()}</p>
                <button onClick={hanleClick} className="bg-slate-100 text-white font-bold px-1 rounded w-12 ">
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            </div>
            <Link href={
                {
                    pathname: '/news',
                    query: { title, description, urlToImage, publishedAt },
                }} className="text-2xl cursor-pointer hover:opacity-60 ">{title}</Link>

        </div>
    );
};

export default NewsCard;