import { Link, useRouterState } from "@tanstack/react-router";
import type { FC } from "react";
import type { DesktopMenuProps } from "./index.types";

const DesktopMenu: FC<DesktopMenuProps> = ({ items }) => {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <div className="flex space-x-4">
      {items.map((i) => {
        const isActive = currentPath === i.path;
        return (
          <Link
            to={i.path}
            key={i.path}
            className={`px-3 py-2 text-sm font-medium ${
              isActive ? "text-red-600" : "text-gray-600"
            }`}
          >
            <span
              className={`border-b-2 pb-2 transition duration-100 ${
                isActive
                  ? "border-red-600"
                  : "border-transparent hover:border-red-500"
              }`}
            >
              {i.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export { DesktopMenu };
