"use client"
import { auth, db, logoutFirebase } from '@/firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import NewsCard from './NewsCard';

interface NewsContainerProps {
    articles: [];
}

const NewsContainer: FC<NewsContainerProps> = ({ articles }) => {
    const router = useRouter()
    const [viewMode, setViewMode] = useState("grid-cols-2")
    const [user, setUser] = useState({ uid: "" })
    const [favorites, setFavorites] = useState([]) as any
    const handleToggle = () => {
        const viewMode = localStorage.getItem("viewMode") || "grid-cols-2"
        if (viewMode === "grid-cols-2") {
            localStorage.setItem("viewMode", "grid-cols-1")
            setViewMode("grid-cols-1")
        }
        else {
            localStorage.setItem("viewMode", "grid-cols-2")
            setViewMode("grid-cols-2")
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getDoc(doc(db, "newsapp-favorites", user.uid))
                    .then((docSnap) => {
                        if (docSnap.exists()) {
                            setFavorites(docSnap.data().titles)
                        }
                        else {
                            setFavorites([{
                                exists: false
                            }])
                        }
                    })
            } else {
                router.push("/auth/signin")
                console.log("user is logged out")
            }
        });

    }, [router])
    useEffect(() => {
        const viewMode = localStorage.getItem("viewMode") || "grid-cols-2"
        setViewMode(viewMode)
    }, [])
    if (!user?.uid) return <div className="w-full">
        <div className="w-full h-16 animate-pulse bg-slate-700 mt-1 mb-5 rounded-lg  flex items-center justify-center text-lg font-bold" >
            Checking Authentication...
        </div>
        <div className={`grid ${viewMode} gap-1 text-lg`}>
            {Array(4).fill(0).map((_, idx) => <div className='max-w-[384px] h-[400px] animate-pulse bg-slate-700 rounded-md' key={idx}></div>)}</div>
    </div>
    return (
        <>
            <div className="h-16 flex justify-between w-full bg-slate-800 p-2 rounded-lg mb-5 mt-1">
                <button onClick={() => logoutFirebase()} className="hover:bg-slate-700 text-white font-bold px-1 rounded">
                    Logout
                </button>
                <label className="switch rounded-lg my-2">
                    <input defaultChecked={viewMode === "grid-cols-1"} onChange={handleToggle} type="checkbox" />
                    <span className="slider" />
                </label>
            </div>
            <div className={`grid ${viewMode} gap-1 place-items-center`}>
                {articles.length && articles.map((article: any, idx: number) => (
                    <NewsCard key={idx} title={article.title} description={article.description} urlToImage={article.urlToImage} publishedAt={article.publishedAt} user={user} favorites={favorites} />
                ))}

            </div></>
    );
};

export default NewsContainer;