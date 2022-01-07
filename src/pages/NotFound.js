import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

function NotFound() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            Not Found
        </HelmetProvider>
    )
}

export default NotFound
