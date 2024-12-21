import { LocateIcon, Mail, Phone } from "lucide-react";
import React from "react";
const Footer = () => {
  return (
    <footer className="mt-36">
      <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />

      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex justify-around lg:gap-52">
          <div className="mb-6 mr-10 flex w-[30%] flex-col items-start md:mb-0">
            <a href="" className="flex items-center">
              <img src="logo.png" className="me-3 h-12" alt="Logo" />
              <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white">
                SwasthyaMeter
              </span>
            </a>
            <p className="text-gray-500">
              SwasthyaMeter is a health related website.
            </p>
          </div>
          <div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Contact Us
              </h2>
              <ul className="space-y-6 font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href="#"
                    className="flex items-center gap-4 hover:underline"
                  >
                    <Mail />
                    ganesh@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Phone />
                    9819006452
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <LocateIcon />
                    BIC
                  </a>
                </li>
                <button
                  type="button"
                  className="mb-2 me-2 rounded-full bg-[#4f9b18] px-10 py-2.5 text-center text-sm font-bold text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Report Bug
                </button>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <div className="text-center sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            <a href="" className="hover:underline">
              Copyright © 2024
            </a>
            &nbsp;Swasthya Meter
          </span>
          <div className="mt-4 flex items-center justify-center gap-3 sm:mt-0">
            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
              All Rights Reserved
            </p>
            <p>|</p>
            <a
              className="text-sm text-[#4a3aff] underline sm:text-center"
              href=""
            >
              Terms and Conditions
            </a>
            <p>|</p>
            <a
              className="text-sm text-[#4a3aff] underline sm:text-center"
              href=""
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
