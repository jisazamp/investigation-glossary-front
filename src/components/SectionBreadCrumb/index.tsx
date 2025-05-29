import type React from "react";
import type { FC, PropsWithChildren } from "react";
import { MdChevronRight } from "react-icons/md";

interface SectionBreadCrumbProps extends PropsWithChildren {
  /**
   * Optional className to extend styling
   */
  className?: string;

  /**
   * Whether to show a container background
   * @default true
   */
  withBackground?: boolean;

  /**
   * Whether to add horizontal scrolling for overflow
   * @default true
   */
  scrollable?: boolean;
}

const SectionBreadCrumb: FC<SectionBreadCrumbProps> = ({
  children,
  className = "",
  withBackground = true,
  scrollable = true,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`
        ${withBackground ? "bg-gray-100" : ""}
        ${scrollable ? "overflow-x-auto" : ""}
        py-3 px-4 flex items-center
        ${className}
      `}
    >
      <div
        className={`
        flex items-center gap-1 min-w-0
        ${scrollable ? "whitespace-nowrap" : "flex-wrap"}
        text-sm
      `}
      >
        {children}
      </div>
    </nav>
  );
};

/**
 * Individual breadcrumb item component
 */
interface BreadcrumbItemProps {
  /**
   * Whether this is the current/active item
   */
  isActive?: boolean;

  /**
   * URL to navigate to when clicked
   */
  href?: string;

  /**
   * Content of the breadcrumb item
   */
  children: React.ReactNode;
}

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
  isActive = false,
  href,
  children,
}) => {
  const content = (
    <span
      className={`
      font-medium
      ${isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-800"}
      transition-colors
    `}
    >
      {children}
    </span>
  );

  return (
    <div className="flex items-center">
      {href && !isActive ? (
        <a href={href} className="focus:outline-none focus:underline">
          {content}
        </a>
      ) : (
        content
      )}

      {!isActive && (
        <MdChevronRight className="h-4 w-4 mx-1 text-gray-400 flex-shrink-0" />
      )}
    </div>
  );
};

export { SectionBreadCrumb, BreadcrumbItem };
