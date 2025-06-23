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
            setLoading(true)
            if (currentUser?.email) {
                try {
                    const userInfo = { email: currentUser?.email };
                    const res = await axiosPublic.post('/jwt', userInfo, { withCredentials: true });
                    console.log('Token set in cookie:', res.data);
                } catch (err) {
                    console.error('Error setting token:', err.response?.data || err.message);
                }
            } else {
                try {
                    await axiosPublic.get('/logout')
                } catch (err) {
                    console.error('Error during logout:', err);
                }
            }
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

