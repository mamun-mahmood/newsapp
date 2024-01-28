"use client"
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { auth, logoutFirebase, signIn } from '@/firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface NewsContainerProps {
    articles: [];
}

const NewsContainer: FC<NewsContainerProps> = ({ articles }) => {
    const router = useRouter()
    const [viewMode, setViewMode] = useState(localStorage.getItem("viewMode") || "grid")
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
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                console.log("uid", uid)
            } else {
                router.push("/auth/signin")
                console.log("user is logged out")
            }
        });

    }, [router])

    return (
        <>
            <div className="flex justify-between">
            <button onClick={() => logoutFirebase()} className="bgbg-slate-800 hover:bg-slate-700 text-white font-bold px-1 rounded">
                Logout
            </button>
                <label className="switch rounded-md my-2">
                    <input defaultChecked={viewMode === "grid-cols-1"} onChange={handleToggle} type="checkbox" />
                    <span className="slider" />
                </label>
            </div>
            <div className={`grid ${viewMode} gap-5`}>
                {articles.map((article: any, idx: number) => (
                    <NewsCard key={idx} title={article.title} description={article.description} urlToImage={article.urlToImage} publishedAt={article.publishedAt} />
                ))}

            </div></>
    );
};

export default NewsContainer;