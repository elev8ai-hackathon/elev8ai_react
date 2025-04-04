// import { Home } from "./pages/Home";
import { MainChat } from "./pages/ChatPage/MainChat";
import { UploadForm } from "./pages/UploadPage/UploadForm";

import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseLayout } from "./components/BaseLayout";
import { UserList } from "./pages/UserList/UserList";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: BaseLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to={"/upload"} />,
});

const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/upload",
  component: UploadForm,
});

const existingRouterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user-list",
  component: UserList,
});

const summaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user-summary",
  component: MainChat,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  uploadRoute,
  existingRouterRoute,
  summaryRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
