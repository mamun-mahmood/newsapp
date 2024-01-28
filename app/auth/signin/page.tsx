"use client"

import { signIn } from "@/firebase/firebase.config";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const router = useRouter()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        signIn(email, password).then(() => {
            router.push("/")
        })
    }
    return (
        <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-black">Sign Up</h1>
            <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-black">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md text-black"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-sm font-bold text-black">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md text-black"
                />
                <Link href="/auth/signup" className="text-right">
                    Create an account
                </Link>
            </div>
            <button className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-md">
                Sign In
            </button>
        </form>

    );
};

export default SignIn;