"use client";

import clsx from "clsx";
import Image from "next/image";
import React, { type ImgHTMLAttributes, useState } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {}

const ImageC = (props: Props) => {
  const { src, alt, className } = props;
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      src={src || ""}
      alt={alt || ""}
      fill
      className={clsx(
        `
      duration-700 ease-in-out group-hover:opacity-75
      ${
        isLoading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0"
      })`,
        className
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export default ImageC;
