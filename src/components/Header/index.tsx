import { MENU_ITEMS } from "@/constants/navigation";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DesktopMenu } from "./DesktopMenu";
import { Logo } from "./Logo";
import { MenuMobileButton } from "./MenuMobileButton";
import { MobileMenu } from "./MobileMenu";

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
      <AnimatePresence>
        {mobileMenuExpanded && (
          <MobileMenu items={MENU_ITEMS} onNavigate={toggleMobileMenu} />
        )}
      </AnimatePresence>
    </nav>
  );
}
