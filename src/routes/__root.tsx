import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/Header";
import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";
import "swiper/css";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:pt-10">
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </div>
  ),
});
