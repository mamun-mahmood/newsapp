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
    if (!user?.uid) return <div className='text-center'>Checking Auth...</div>
    return (
        <>
            <div className="flex justify-between w-full">
                <button onClick={() => logoutFirebase()} className="hover:bg-slate-700 text-white font-bold px-1 rounded">
                    Logout
                </button>
                <label className="switch rounded-md my-2">
                    <input defaultChecked={viewMode === "grid-cols-1"} onChange={handleToggle} type="checkbox" />
                    <span className="slider" />
                </label>
            </div>
            <div className={`grid ${viewMode} gap-1 place-items-center`}>
                {!articles.length && <>
                    {Array(10).fill(0).map((_, idx) => <div className='h-[400px]  max-w-[400px] animate-pulse bg-slate-700 rounded-md' key={idx}></div>)}
                </>}
                {articles.length && articles.map((article: any, idx: number) => (
                    <NewsCard key={idx} title={article.title} description={article.description} urlToImage={article.urlToImage} publishedAt={article.publishedAt} user={user} favorites={favorites} />
                ))}

            </div></>
    );
};

export default NewsContainer;