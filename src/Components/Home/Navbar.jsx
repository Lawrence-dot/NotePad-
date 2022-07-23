import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/4066031.png'

function Navbar() {
    return (
        <div className="Navbar">
            <nav className="bg-blue-600 border-gray-200 text-white p-3 shadow">
                <div className="container flex flex-wrap justify-center mx-auto">
                    <img className='mr-1' src={Logo} height='40' width='40' alt="" srcset="" />
                    <Link to="/" className="Countdown text-white-900 font-bold text-center">
                        Countdown
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
