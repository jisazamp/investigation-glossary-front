import { Link } from "@tanstack/react-router";
import type { FC } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { SectionBreadCrumb } from "../SectionBreadCrumb";
import type { CategoriesProps } from "./index.types";

const Categories: FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="mt-4">
      <SectionBreadCrumb>
        <p className="uppercase text-sm text-blue-500 font-bold">Categorías</p>
      </SectionBreadCrumb>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mx-auto max-w-5xl">
        {categories.map((c) => (
          <Link
            className="flex items-center gap-2"
            key={c.documentId}
            search={{ categoria: c.id }}
            to="/conceptos"
          >
            <MdOutlineCategory fontSize={24} className="text-blue-900" />
            <span>{c.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { Categories };
