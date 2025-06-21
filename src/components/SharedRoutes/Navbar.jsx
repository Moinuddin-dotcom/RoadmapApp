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
        <div className='flex justify-between items-center border-b border-gray-500 py-5 px-20'>
            <Link to={'/'}><h1>RoadMap App</h1></Link>
            <div>
                {user ? <>
                    <div className='flex gap-4 items-center'>
                        <h1>{userData.name}</h1>
                        {/* <div><h1>{userData.role}</h1></div> */}
                        <button
                            onClick={handleLogout}
                            className='bg-black/90 text-white px-10 py-2 rounded-lg cursor-pointer'
                        >Log out</button>
                    </div>
                </>
                    : <Link to={'/login'}>
                        <button className='bg-black/90 text-white px-10 py-2 rounded-lg cursor-pointer'>Log In</button>
                    </Link>}
            </div>
        </div>
    )
}

export default Navbar
