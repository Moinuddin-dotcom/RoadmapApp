import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import toast from 'react-hot-toast'
import useUser from '../../Hooks/useUser'



const Navbar = () => {
    const { user, logout } = useAuth()
    const [userData] = useUser()
    console.log(userData)
    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch((err) => toast.error(err.message));
    }
    return (
        <div className='flex justify-between items-center max-w-[90vw] mx-auto border-2 border-black py-5 px-2'>
            <Link to={'/'}><h1>RoadMap App</h1></Link>
            <div>
                {user ? <>
                    <div><h1>{userData.name}</h1></div>
                    <div><h1>{userData.role}</h1></div>
                    <button
                        onClick={handleLogout}
                        className='bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 px-3 py-1 rounded-lg cursor-pointer'
                    >Log out</button>
                </>
                    : <Link to={'/login'}>
                        <button className='bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 px-3 py-1 rounded-lg cursor-pointer'>Log In</button>
                    </Link>}
            </div>
        </div>
    )
}

export default Navbar
