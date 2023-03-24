//* Libraries imports
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Slot } from "expo-router";

//* Store imports
import { userStore } from "@store/user";

const queryClient = new QueryClient();

export default function HomeLayout() {;

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  )
}