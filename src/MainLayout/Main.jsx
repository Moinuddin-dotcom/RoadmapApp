import React from 'react'
import Footer from '../components/SharedRoutes/Footer'
import Navbar from '../components/SharedRoutes/Navbar'
import { Outlet, useLocation } from 'react-router-dom'

const Main = () => {
    const location = useLocation()

    const isLogin = location.pathname.includes('login')
    const isRegister = location.pathname.includes('register')
    return (
        <div>
            <nav>
                {isLogin || isRegister || <Navbar />}

            </nav>
            <main className=''>
                <Outlet />
            </main>
            <footer>
                {isLogin || isRegister || <Footer />}
            </footer>
        </div>
    )
}

export default Main
