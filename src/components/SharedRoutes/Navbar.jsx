import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import toast from 'react-hot-toast'
import useUser from '../../Hooks/useUser'



const Navbar = () => {
    const { user, logout } = useAuth()
    const [userData] = useUser()
    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch((err) => toast.error(err.message));
    }
    return (
        <div className='flex justify-between items-center border-b border-gray-500 py-5 px-10'>
            <Link to={'/'}><h1 className='text-2xl text-white font-bold bg-black/90 px-10 py-2 rounded-lg cursor-pointer'>RMA</h1></Link>
            {/* <div className='flex gap-4 items-center'>
                <Link to={'/todo-roadmap'} className='w-30 text-black text-sm bg-white/55 hover:bg-black hover:text-white border text-center px-3 py-2 font-semibold rounded-md'>
                    <h1>Track roadmap</h1>
                </Link>
                <Link to={'/'} className='w-30 text-black text-sm bg-white/55 hover:bg-black hover:text-white border text-center px-3 py-2 font-semibold rounded-md'>
                    <h1>All Post</h1>
                </Link>
            </div> */}
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
