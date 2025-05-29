import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle,
  Database,
  FileText,
  Search,
  Users,
} from "lucide-react";
import type { FC } from "react";

const processSteps = [
  {
    icon: BookOpen,
    title: "Investigación",
    description:
      "Recopilación exhaustiva de términos y conceptos de investigación académica.",
  },
  {
    icon: Users,
    title: "Colaboración",
    description:
      "Trabajo conjunto con expertos y académicos para validar definiciones.",
  },
  {
    icon: FileText,
    title: "Documentación",
    description:
      "Estructuración y organización sistemática de todos los conceptos.",
  },
  {
    icon: Database,
    title: "Digitalización",
    description:
      "Implementación en plataforma digital accesible y fácil de usar.",
  },
  {
    icon: CheckCircle,
    title: "Validación",
    description: "Revisión final y verificación de la calidad del contenido.",
  },
];

const Home: FC = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            to="/categorias"
            className="
              group relative py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold text-lg
              hover:bg-blue-700 active:bg-blue-800 
              transition-all duration-200 transform hover:scale-105 active:scale-95
              shadow-md hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
          >
            <button type="button" className="mx-auto flex">
              <span className="relative z-10 text-center">Categorías</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </Link>

          <Link
            to="/conceptos"
            className="
              group relative py-4 px-6 bg-red-600 text-white rounded-lg font-semibold text-lg
              hover:bg-red-700 active:bg-red-800 
              transition-all duration-200 transform hover:scale-105 active:scale-95
              shadow-md hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            "
          >
            <button type="button" className="mx-auto flex">
              <span className="relative z-10 text-center">Conceptos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </Link>

          <Link
            to="/autores"
            className="
              group relative py-4 px-6 bg-gray-600 text-white rounded-lg font-semibold text-lg
              hover:bg-gray-700 active:bg-gray-800 
              transition-all duration-200 transform hover:scale-105 active:scale-95
              shadow-md hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            "
          >
            <button type="button" className="mx-auto flex">
              <span className="relative z-10 text-center">Autores</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Busca conceptos o autores"
              className="
                w-full h-14 pl-12 pr-4 text-base
                border-2 border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                placeholder:text-gray-400
                transition-all duration-200
                hover:border-gray-400
              "
              aria-label="Buscar en el diccionario"
            />
          </div>
        </div>

        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Diccionario de Investigación
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Una herramienta completa que reúne los términos más importantes del
            ámbito de la investigación académica. Diseñado para estudiantes,
            investigadores y académicos que buscan claridad en conceptos
            especializados.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            ¿Cómo se hizo?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.title}
                  className="
                    group flex flex-col items-center text-center p-4 rounded-lg
                    hover:bg-white hover:shadow-md transition-all duration-300
                    transform hover:scale-105
                  "
                >
                  <div
                    className="
                    relative mb-4 p-4 bg-white rounded-full shadow-md
                    group-hover:shadow-lg group-hover:bg-blue-50
                    transition-all duration-300
                  "
                  >
                    <IconComponent
                      size={40}
                      className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300"
                    />

                    <div
                      className="
                      absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white 
                      rounded-full flex items-center justify-center text-xs font-bold
                      group-hover:bg-blue-700 transition-colors duration-300
                    "
                    >
                      {index + 1}
                    </div>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                    {step.title}
                  </h4>

                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Home };
