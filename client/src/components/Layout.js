import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Layout = () => {
    return (
        <>
            <main>
                
                <Navbar />
                <Outlet />
                <Footer/>

            </main>
        </>
    )
}
