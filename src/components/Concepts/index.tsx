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

      <div className="mt-4 px-4">
        <div className="grid md:flex grid-cols-6 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-13 gap-2 mb-4">
          {SPANISH_ALPHABET.map((letter) => (
            <button
              key={letter}
              className={`
                h-10 sm:h-8 w-full sm:w-8 rounded-md font-semibold text-base sm:text-lg
                transition-all duration-200 border-2
                ${
                  selectedLetter === letter
                    ? "bg-red-500 text-white border-red-500 shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              `}
              onClick={() => onFilter(letter)}
              aria-label={`Filter by letter ${letter}`}
            >
              {letter}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <button
            className={`
              w-full sm:w-auto px-6 py-3 rounded-md font-semibold text-lg
              transition-all duration-200 border-2
              ${
                !selectedLetter
                  ? "bg-red-500 text-white border-red-500 shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }
              active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            `}
            onClick={() => onFilter(null)}
            aria-label="Mostrar todos los conceptos"
          >
            <span className="block sm:hidden">Todos</span>
            <span className="hidden sm:block">Todos los Conceptos</span>
          </button>
        </div>
      </div>

      <div className="px-4">
        {concepts.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {concepts.map((concept) => (
              <li
                key={concept.documentId}
                className="
                  relative pl-6 py-2 sm:py-3 rounded-lg bg-white border border-gray-100
                  hover:shadow-md hover:border-gray-200 transition-all duration-200
                  before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 
                  before:h-2 before:w-2 sm:before:h-3 sm:before:w-3 
                  before:rounded-full before:bg-red-600
                "
              >
                <span className="text-sm sm:text-base text-gray-800 leading-relaxed">
                  {concept.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {selectedLetter
                ? `No hay conceptos que comiencen con "${selectedLetter}"`
                : "No hay conceptos disponibles"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Concepts };
