import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="Navbar">
            <nav className="bg-blue-400 border-gray-200 rounded text-white p-3 shadow">
                <div className="container flex flex-wrap justify-center mx-auto">
                    <Link to="/" className="Countdown text-white-900 font-bold text-center">
                        Countdown
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
