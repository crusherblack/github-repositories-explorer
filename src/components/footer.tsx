import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-white rounded-lg shadow dark:bg-black/80 -mt-36 dark:text-white/90">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-900 lg:my-8" />
      <div className="block text-center text-sm text-gray-500  dark:text-gray-400 pb-8">
        <p>© 2023 Fadhil Darma Putera Zagoto. All Rights Reserved.</p>

        <a
          href="https://github.com/crusherblack/github-repositories-explorer"
          className="hover:cursor-pointer hover:underline text-black/90 dark:text-white/90 "
          target="_blank"
          rel="noopener noreferrer"
        >
          {`(Open Source on Github)`}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
