import React from "react";

interface ErrorWithMessage {
  message: string;
}

interface FetchBaseQueryError extends ErrorWithMessage {
  data?: any;
  status?: number;
}

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return (
    typeof error === "object" &&
    error !== null &&
    ("data" in error || "status" in error)
  );
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return typeof error === "object" && error !== null && "message" in error;
};

export const toErrorWithMessage = (
  error: unknown,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
): void => {
  if (isFetchBaseQueryError(error)) {
    const errMsg =
      "error" in error
        ? error.error
        : error.data?.error
        ? error.data?.error
        : JSON.stringify(error.data);
    setError(errMsg);
  } else if (isErrorWithMessage(error)) {
    setError(error.message);
  }
};
