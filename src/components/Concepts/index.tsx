import { SPANISH_ALPHABET } from "@/constants/concepts";
import type { FC } from "react";
import { SectionBreadCrumb } from "../SectionBreadCrumb";
import type { ConceptsProps } from "./index.types";

const Concepts: FC<ConceptsProps> = ({
  category,
  concepts,
  selectedLetter,
  onFilter,
}) => {
  return (
    <div className="mt-4">
      <SectionBreadCrumb>
        <p className="uppercase text-sm">
          Categorías / <span className="capitalize">{category.name}</span>
        </p>
      </SectionBreadCrumb>

      <div className="flex flex-wrap gap-1 mt-3 mx-auto max-w-6xl">
        {SPANISH_ALPHABET.map((letter) => (
          <span
            key={letter}
            className={`font-medium hover:underline cursor-pointer text-lg p-2 ${selectedLetter === letter ? "text-red-500" : ""}`}
            onClick={() => onFilter(letter)}
            onKeyDown={() => onFilter(letter)}
          >
            {letter}
          </span>
        ))}
        <span className="text-gray-400 font-normal text-xl p-2 mx-2">|</span>
        <span
          className={`font-medium hover:underline cursor-pointer text-xl p-2 ${!selectedLetter ? "text-red-500" : ""}`}
          onClick={() => onFilter(null)}
          onKeyDown={() => onFilter(null)}
        >
          <span className="block md:hidden">Todos</span>
          <span className="hidden md:block">Todos los Conceptos</span>
        </span>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 max-w-5xl mx-auto">
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
