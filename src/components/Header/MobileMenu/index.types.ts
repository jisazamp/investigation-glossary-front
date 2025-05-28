import type { MenuItem } from "../index.type";

export interface MobileMenuProps {
  items: MenuItem[];
  onNavigate: () => void;
}
