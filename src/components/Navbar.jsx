"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  return (
    <>
      <nav className="flex items-center justify-between p-10 pb-0">
        <div className="logo-section flex items-center gap-3">
          <img
            className="w-20"
            src="https://s3-alpha.figma.com/hub/file/1913095808/a7bdc469-cd70-4ea1-bb57-b59204ad8182-cover.png"
            alt="logo"
          />
          <p className="font-bold">SwasthyaMeter</p>
        </div>
        <ul className="items-center gap-7 font-bold sm:flex">
          {/* <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="#about">
            About Us
          </Link> */}
          <Link
            href="/signin"
            className="mb-2 me-2 rounded-xl bg-[#4b8820] px-8 py-2.5 text-center text-sm font-bold text-white transition duration-300 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Login
          </Link>
        </ul>
        {/* <RxHamburgerMenu
          onClick={() => setMobile(!mobile)}
          className="cursor-pointer text-2xl sm:hidden"
        /> */}
      </nav>
      {/* {mobile && (
        <div className="nav-mobile">
          <ul className="grid justify-items-center gap-3 pb-3 text-center font-bold">
            <a href="">Home</a>
            <a href="">About Us</a>
            <button
              type="button"
              className="mb-2 me-2 rounded-xl bg-[#4f9b18] px-10 py-2.5 text-center text-sm font-bold text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login
            </button>
          </ul>
        </div>
      )} */}
    </>
  );
};

export default Navbar;
