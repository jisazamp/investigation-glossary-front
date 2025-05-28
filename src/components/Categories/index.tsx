import { Link } from "@tanstack/react-router";
import type { FC } from "react";
import { MdChevronRight, MdOutlineCategory } from "react-icons/md";
import { SectionBreadCrumb } from "../SectionBreadCrumb";
import type { CategoriesProps } from "./index.types";

const Categories: FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="mt-4">
      <SectionBreadCrumb>
        <p className="uppercase text-sm text-blue-500 font-bold">Categorías</p>
      </SectionBreadCrumb>

      <div className="px-4 mt-6">
        {/* Mobile-first grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.documentId}
              className="
                group flex items-center justify-between p-4 sm:p-5
                bg-white rounded-xl border border-gray-200
                hover:shadow-lg hover:border-blue-300 hover:-translate-y-1
                active:scale-95 active:shadow-md
                transition-all duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                min-h-[64px] sm:min-h-[72px]
              "
              search={{ categoria: category.id }}
              to="/conceptos"
              aria-label={`View concepts in ${category.name} category`}
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div
                  className="
                  flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 
                  bg-blue-50 rounded-lg flex items-center justify-center
                  group-hover:bg-blue-100 transition-colors duration-200
                "
                >
                  <MdOutlineCategory className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <span
                  className="
                  text-gray-800 font-medium text-base sm:text-lg
                  truncate group-hover:text-blue-700 transition-colors duration-200
                "
                >
                  {category.name}
                </span>
              </div>

              <MdChevronRight
                className="
                text-gray-400 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0
                group-hover:text-blue-500 group-hover:translate-x-1
                transition-all duration-200
              "
              />
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <MdOutlineCategory className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">
              No hay categorías disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Categories };
