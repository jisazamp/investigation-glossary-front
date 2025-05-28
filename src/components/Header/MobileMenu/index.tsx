import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { FC } from "react";
import type { MobileMenuProps } from "./index.types";

const MobileMenu: FC<MobileMenuProps> = ({ items, onNavigate }) => {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <motion.div
      key="mobile-menu"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sm:hidden overflow-hidden shadow-md"
      id="mobile-menu"
    >
      <div className="space-y-1 px-4 pt-4 pb-6 bg-white shadow-md rounded-b-lg">
        {items.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`block rounded-md px-4 py-2 text-base font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-red-100 text-red-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export { MobileMenu };
