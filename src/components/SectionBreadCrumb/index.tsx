import type { FC, PropsWithChildren } from "react";

interface SectionBreadCrumbProps extends PropsWithChildren {}

const SectionBreadCrumb: FC<SectionBreadCrumbProps> = ({ children }) => {
  return <div className="bg-gray-100 p-2">{children}</div>;
};

export { SectionBreadCrumb };
