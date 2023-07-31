import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 py-4 sticky top-0">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <span className="text-4xl tracking-wider font-bold cursor-pointer" onClick={() => navigate("/")}>
            Connectify
          </span>
        </div>
        <ul className="flex space-x-4 text-xl">
          <li>
            <NavLink
              to=''
              className="text-white hover:text-purple-300 transition duration-300">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/register'
              className="text-white hover:text-purple-300 transition duration-300">
              Sign up
            </NavLink>
          </li>
          <li>
            <NavLink
              to='./login'
              className="text-white hover:text-purple-300 transition duration-300">
              Sign in
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
