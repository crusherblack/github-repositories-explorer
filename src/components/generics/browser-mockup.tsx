import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

const BrowserMockup = (props: Props) => {
  const { children } = props;

  return (
    <div className="max-w-3xl mx-auto ">
      <div className="w-full h-8 rounded-t-lg bg-gray-900 flex justify-start items-center space-x-1.5 px-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
      </div>
      <div className="bg-gray-700 border-t-0 w-full md:h-fit">{children}</div>
    </div>
  );
};

export default BrowserMockup;
