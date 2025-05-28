import type { FC } from "react";
import { SectionBreadCrumb } from "../SectionBreadCrumb";
import type { ConceptsProps } from "./index.types";

const Concepts: FC<ConceptsProps> = ({ category, concepts }) => {
  return (
    <div className="mt-4">
      <SectionBreadCrumb>
        <p className="uppercase text-sm">
          Categorías / <span className="capitalize">{category.name}</span>
        </p>
      </SectionBreadCrumb>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {concepts.map((concept) => (
          <li
            key={concept.documentId}
            className="relative pl-6 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-3 before:w-3 before:rounded-full before:bg-red-600"
          >
            {concept.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Concepts };
