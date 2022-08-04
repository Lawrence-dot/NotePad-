import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/3.png";

function Navbar() {
  return (
    <div className="Navbar">
      <nav className="bg-blue-600 border-gray-200 text-white p-2 shadow">
        <div className="container flex flex-wrap justify-center mx-auto">
          <img
            className="mr-1"
            src={Logo}
            height="32"
            width="38"
            alt=""
            srcset=""
          />
          <Link
            to="/"
            className="Countdown text-white-900 font-bold text-center"
          >
            Countdown
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
