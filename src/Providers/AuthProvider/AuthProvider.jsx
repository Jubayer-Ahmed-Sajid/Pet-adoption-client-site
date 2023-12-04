import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../Firebase.config";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const gitHubProvider = new GithubAuthProvider()
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const Signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name,image)=>{
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: image
        })


    }
    const googleSignin = ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const gitHubSignin =()=>{
        setLoading(true)
        return signInWithPopup(auth,gitHubProvider)
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
            if(currentUser){

                const userInfo = {email: currentUser?.email}
                    axiosPublic.post('/jwt',userInfo)
                    .then(res=>{
                        if(res.data.token){
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }
            else{
                localStorage.removeItem('access-token')
            }
            
            setLoading(false)



        });
        return () => {
            return unSubscribe()
        }
    }, [auth,axiosPublic])

    const authIfo = { createUser, Signin, SignOutUser, signinWithGoogle, user, loading,updateUser,googleSignin,gitHubSignin }

    return (
        <AuthContext.Provider value={authIfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;