"use client";
import TokenRefresher from "@/components/common/TokenRefresher";
import { store } from "@/utils/hooks/react-redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const Providers = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};
export default Providers;
