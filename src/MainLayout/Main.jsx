import React from 'react'
import Footer from '../components/SharedRoutes/Footer'
import Navbar from '../components/SharedRoutes/Navbar'
import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <main className='h-screen'>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Main
