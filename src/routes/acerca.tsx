import type { FC } from "react";
import { BookOpen, CheckCircle, Database, FileText, Users } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

const PROCESS_STEPS = [
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

const About: FC = () => {
  return (
    <div className="mt-10 mb-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
        ¿Cómo se hizo?
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
        {PROCESS_STEPS.map((step, index) => {
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
  );
};

export const Route = createFileRoute("/acerca")({
  component: About,
});
