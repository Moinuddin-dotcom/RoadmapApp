import React from 'react'
import Footer from '../components/SharedRoutes/Footer'
import Navbar from '../components/SharedRoutes/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { Head, useHead } from '@unhead/react'

const Main = () => {

    useHead({
        title: 'Roadmap App',
        meta: [
            { name: 'description', content: 'My awesome site description' }
        ]
    })


    const location = useLocation()
    const isLogin = location.pathname.includes('login')
    const isRegister = location.pathname.includes('register')
    return (
        <div>
            <Head>
                <title>Roadmap App</title>
                {/* <meta name="description" content="My awesome site description" /> */}
            </Head>
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
