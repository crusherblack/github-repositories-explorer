import React from "react";

type Props = {
  icon: JSX.Element;
  title: string | undefined | null;
};

const IconText = (props: Props) => {
  const { icon, title } = props;

  return (
    <div className="flex items-center gap-2 w-full flex-start mb-2">
      {icon}
      {title || "-"}
    </div>
  );
};

export default IconText;
