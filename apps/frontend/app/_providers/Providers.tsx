"use client";

import { ReactNode } from "react";
import AuthContext from "./AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProviderPropType = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: ProviderPropType) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>{children}</AuthContext>
    </QueryClientProvider>
  );
};

export default Providers;
