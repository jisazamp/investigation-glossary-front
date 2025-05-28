import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";
import type { MenuMobileButtonProps } from "./index.types";

const MenuMobileButton: FC<MenuMobileButtonProps> = ({
  mobileMenuExpanded,
  toggleMobileMenu,
}) => {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button
        type="button"
        onClick={toggleMobileMenu}
        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-inset"
        aria-controls="mobile-menu"
        aria-expanded={mobileMenuExpanded}
      >
        <span className="sr-only">Abrir menú principal</span>
        <AnimatePresence mode="wait" initial={false}>
          {!mobileMenuExpanded ? (
            <motion.svg
              key="burger"
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="close"
              initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export { MenuMobileButton };
