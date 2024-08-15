import React from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Layout = () => {
    return (
        <>
            <Helmet>
                <title>E-Learning Platform</title>
                <meta name="description" content="Learn anything, anytime, anywhere with our comprehensive e-learning platform." />
                <meta name="keywords" content="e-learning, online courses, education, learning platform" />
                <meta property="og:title" content="E-Learning Platform" />
                <meta property="og:description" content="Learn anything, anytime, anywhere with our comprehensive e-learning platform." />
            </Helmet>
            <Outlet />
        </>
    )
}

export default Layout