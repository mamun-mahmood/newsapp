"use client"
import { auth, db, logoutFirebase } from '@/firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';

const NewsContainer = () => {
    const getNews = async () => {
        const res = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)
        const data = await res.json()
        return (data)
    }
    const [articles, setArticles] = useState([]) as any
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
        getNews().then((data) => {
            setArticles(data.articles)
        })

    }, [])
    if (!user?.uid) return <div>loading...</div>
    if (user?.uid) return (
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
                    <NewsCard key={idx} title={article.title} description={article.description} urlToImage={article.urlToImage} publishedAt={article.publishedAt} user={user} favorites={favorites} />
                ))}

            </div></>
    );
};

export default NewsContainer;