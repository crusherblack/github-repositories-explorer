import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-black/80 -mt-36 dark:text-white/90">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 text-center dark:text-gray-400 pb-8">
        © 2023{" "}
        <a href="#" className="hover:underline">
          Mesrawati Hia
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
