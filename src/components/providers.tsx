"use client";

import { Provider } from "react-redux";

import { ThemeProvider } from "next-themes";
import { store } from "@/redux/store";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = (props: ProvidersProps) => {
  const { children } = props;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
export default Providers;
