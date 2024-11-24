import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-red-100">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-red-300"> Roof</span>
            <span className="text-red-400"> Groove</span>
          </h1>
        </Link>
        <form action="" className="bg-white p-3 rounded-lg flex items-center">
          {" "}
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-red-300" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className=" hidden sm:inline text-red-400 hover:underline ">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" hidden sm:inline text-red-400 hover:underline ">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="  text-red-400 hover:underline ">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
