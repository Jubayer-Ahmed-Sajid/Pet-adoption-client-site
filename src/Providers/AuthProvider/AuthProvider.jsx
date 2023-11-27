import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { Children, createContext, useEffect, useState } from "react";
import auth from "../../Firebase.config";

export const AuthContext = createContext()

const AuthProvider = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const Signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const SignOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    const signinWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(googleProvider)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged((auth), currentUser => {

            setUser(currentUser)
            setLoading(false)



        });
        return () => {
            return unSubscribe()
        }
    }, [])

    const authIfo = { createUser, Signin, SignOutUser, signinWithGoogle, user, loading }

    return (
        <AuthContext.Provider value={authIfo}>
            {Children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;