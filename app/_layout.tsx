import { QueryClient, QueryClientProvider } from "react-query";
import { Slot } from "expo-router";

const queryClient = new QueryClient();

export default function HomeLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  )
}