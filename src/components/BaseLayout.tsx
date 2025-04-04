import { Link, Outlet } from "@tanstack/react-router";
import { Elev8Ai } from "./Header";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const BaseLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between h-20">
        <div>content from context</div>
        <div className="p-2 flex gap-4">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/user-list" className="[&.active]:font-bold">
            User List
          </Link>
        </div>
        <div className="p-4">
          <Elev8Ai />
        </div>
      </div>
      <div className="h-[calc(100vh-80px)]">
        <Outlet />

        <TanStackRouterDevtools />
      </div>
    </div>
  );
};
