"use client"
import React, { FC } from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import app from './firebase.config';

const auth = getAuth(app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);
interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = React.useState(null) as any;
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};