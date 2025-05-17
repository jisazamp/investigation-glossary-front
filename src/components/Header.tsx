import { Link } from "@tanstack/react-router";
import { type FC, type SVGProps, useState } from "react";
import upbLogo from "../upb-logo.webp";

const BurgerIcon: FC<SVGProps<SVGElement>> = (props) => {
  const { className } = props;

  return (
    <svg
      className={className}
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
    </svg>
  );
};

const CloseIcon: FC<SVGProps<SVGElement>> = (props) => {
  const { className } = props;

  return (
    <svg
      className={className}
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
    </svg>
  );
};

interface MenuMobileButtonProps {
  mobileMenuExpanded: boolean;
  toggleMobileMenu: () => void;
}

const MenuMobileButton: FC<MenuMobileButtonProps> = (props) => {
  const { mobileMenuExpanded, toggleMobileMenu } = props;

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
        <BurgerIcon
          className={`${mobileMenuExpanded ? "hidden" : "block"} size-6`}
        />
        <CloseIcon
          className={`${mobileMenuExpanded ? "block" : "hidden"} size-6`}
        />
      </button>
    </div>
  );
};

const Logo: FC = () => {
  return (
    <div className="flex shrink-0 items-center">
      <img
        className="h-8 w-auto"
        src={upbLogo}
        alt="Universidad Pontificia Bolivariana"
      />
    </div>
  );
};

const MobileMenu: FC = () => {
  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {["Dashboard", "Team", "Projects", "Calendar"].map((item) => (
          <a
            key={item}
            href="/"
            className={`block rounded-md px-3 py-2 text-base font-medium ${
              item === "Dashboard"
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

const DesktopMenu: FC<{ items: MenuItem[] }> = (props) => {
  const { items } = props;

  return (
    <div className="flex space-x-4">
      {items.map((i) => (
        <Link
          to={i.path}
          key={i.path}
          className="px-3 py-2 text-sm font-medium"
        >
          <span className="border-b-2 border-transparent hover:border-red-500 transition duration-100 pb-2">
            {i.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

type MenuItem = {
  label: string;
  path: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "Inicio", path: "/" },
  { label: "Créditos", path: "/creditos" },
  { label: "Acerca de", path: "/acerca" },
];

export default function Header() {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuExpanded(!mobileMenuExpanded);
  };

  return (
    <nav className="bg-white shadow-mobile-only">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <MenuMobileButton
            mobileMenuExpanded={mobileMenuExpanded}
            toggleMobileMenu={toggleMobileMenu}
          />
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            <Logo />
            <div className="hidden sm:ml-6 sm:block">
              <DesktopMenu items={MENU_ITEMS} />
            </div>
          </div>
        </div>
      </div>
      {mobileMenuExpanded && <MobileMenu />}
    </nav>
  );
}
