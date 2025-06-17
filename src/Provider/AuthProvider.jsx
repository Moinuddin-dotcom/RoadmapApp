import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../Firebase/Firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    // create new user
    const createUser = (email, passord) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, passord)
    }

    // user Sign in
    const signIn = (email, passord) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, passord)
    }


    // user logout
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("Current user=> ", currentUser)
            setUser(currentUser)
            // if (currentUser?.email) {
            //     setUser(currentUser)
            //     const { data } = await axiosPublic.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: currentUser?.email }, { withCredentials: true })
            //     console.log(data)
            // } else {
            //     setUser(currentUser)
            //     const { data } = await axiosPublic.get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true })
            //     console.log(data)
            // }
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }

    }, [axiosPublic])




    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

