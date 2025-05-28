import { SPANISH_ALPHABET } from "@/constants/concepts";
import { motion } from "framer-motion";
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

      <div className="flex flex-wrap gap-3 mt-3">
        {SPANISH_ALPHABET.map((letter) => (
          <motion.span
            key={letter}
            className="hover:underline cursor-pointer"
            initial={false}
            animate={{
              fontWeight: selectedLetter === letter ? 700 : 500,
              color: selectedLetter === letter ? "#b91c1c" : "#1e293b",
            }}
            transition={{ duration: 0.2 }}
            onClick={() => onFilter(letter)}
            onKeyDown={() => onFilter(letter)}
          >
            {letter}
          </motion.span>
        ))}
        <span className="text-gray-400 font-normal mx-2">|</span>
        <span
          className="hover:underline cursor-pointer"
          onClick={() => onFilter(null)}
          onKeyDown={() => onFilter(null)}
        >
          Todos los Conceptos
        </span>
      </div>

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
