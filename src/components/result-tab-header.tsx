import React from "react";
import { AiFillGithub } from "react-icons/ai";

type Props = {
  username: string;
};

const ResultTabHeader = (props: Props) => {
  const { username } = props;

  return (
    <div className="flex items-center gap-2 ">
      {/* <AiFillGithub className="w-6 h-6" /> */}
      <p className="text-md">{username}</p>
    </div>
  );
};

export default ResultTabHeader;
