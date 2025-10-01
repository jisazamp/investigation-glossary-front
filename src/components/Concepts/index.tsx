import { SPANISH_ALPHABET } from "@/constants/concepts";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { FC } from "react";
import { BreadcrumbItem, SectionBreadCrumb } from "../SectionBreadCrumb";
import type { ConceptsProps } from "./index.types";

const Concepts: FC<ConceptsProps> = ({
  category,
  concepts,
  pagination,
  selectedLetter,
  onFilter,
  onPageChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleLetterClick = (letter: string | null) => {
    onFilter(letter);
    setSearchTerm("");
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        onFilter(searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, onFilter]);

  return (
    <div className="mt-4 mb-20">
      <SectionBreadCrumb>
        <BreadcrumbItem isActive={!category}>
          <Link to={!category ? "/conceptos" : "/categorias"}>
            {!category ? "Conceptos" : "Categorías"}
          </Link>
        </BreadcrumbItem>
        {category && (
          <BreadcrumbItem isActive={true}>{category.name}</BreadcrumbItem>
        )}
      </SectionBreadCrumb>

      <div className="mt-4 px-4 space-y-4">
        <div className="mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar conceptos por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full h-11 pl-10 pr-4 text-base
                border border-gray-200 rounded-md
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                placeholder:text-gray-400
                transition-colors duration-200
              "
            />
          </div>
        </div>

        <div className="space-y-3 flex flex-col mt-2">
          <div className="flex flex-wrap justify-center xl:justify-between gap-1 items-center">
            <p className="mr-2 hidden md:block">Letra</p>
            {SPANISH_ALPHABET.map((letter) => (
              <button
                type="button"
                key={letter}
                className={`
                  h-8 w-8 rounded-md font-semibold text-sm
                  transition-all duration-200 border
                  ${
                    selectedLetter === letter
                      ? "bg-red-500 text-white border-red-500 shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }
                  active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1
                `}
                onClick={() => handleLetterClick(letter)}
                aria-label={`Filtrar por letra ${letter}`}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className={`
                px-4 py-2 rounded-md font-medium text-sm
                transition-all duration-200 border
                ${
                  !selectedLetter
                    ? "bg-red-500 text-white border-red-500 shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1
              `}
              onClick={() => handleLetterClick(null)}
              aria-label="Mostrar todos los conceptos"
            >
              Todos los Conceptos
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        {concepts.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {concepts.map((concept) => (
              <Link
                key={concept.documentId}
                params={{ conceptId: String(concept.id) }}
                to="/conceptos/$conceptId"
              >
                <li
                  className="
                  group relative pl-6 py-3 rounded-lg bg-white border border-gray-100
                  hover:shadow-md hover:border-gray-200 hover:bg-gray-50 
                  transition-all duration-200 cursor-pointer
                  before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 
                  before:h-2 before:w-2 sm:before:h-3 sm:before:w-3 
                  before:rounded-full before:bg-red-600
                  before:transition-all before:duration-200
                  hover:before:bg-red-700
                "
                >
                  <div className="space-y-1">
                    <span className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed block ml-2">
                      {concept.name}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <div className="space-y-2">
              <p className="text-gray-500 text-lg">
                {selectedLetter
                  ? `No hay conceptos que comiencen con "${selectedLetter}"`
                  : "No hay conceptos disponibles"}
              </p>
              {(searchTerm || selectedLetter) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    onFilter(null);
                  }}
                  className="text-red-600 hover:text-red-700 text-sm font-medium underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {pagination?.pagination.pageCount && (
        <nav
          aria-label="Navegación de conceptos"
          className="flex justify-center mt-20"
        >
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <a
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                onClick={() => onPageChange(pagination.pagination.page - 1)}
              >
                &lt;
              </a>
            </li>

            {Array.from(
              { length: pagination.pagination.pageCount },
              (_, index) => index + 1,
            ).map((_, index) => (
              <li key={index} className="cursor-pointer">
                <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  {index + 1}
                </a>
              </li>
            ))}

            <li>
              <a
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                onClick={() => onPageChange(pagination.pagination.page + 1)}
              >
                &gt;
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export { Concepts };
