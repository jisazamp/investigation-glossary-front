import type { FC } from "react";
import { SectionBreadCrumb } from "../SectionBreadCrumb";
import type { CategoriesProps } from "./index.types";

const Categories: FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="mt-4">
      <SectionBreadCrumb>
        <div>Breadcrumb</div>
      </SectionBreadCrumb>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <div key={c.documentId}>
            <span>{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Categories };
