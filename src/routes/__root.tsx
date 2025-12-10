import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/Header";
import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";
import "swiper/css";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:pt-10">
      <Header />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </div>
  ),
});

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo Column */}
          <div className="flex flex-col flex-1">
            <h3 className="text-2xl font-bold text-gray-900">Logo</h3>
          </div>

          {/* Description Column */}
          <div className="flex flex-col flex-2">
            <p className="text-sm text-gray-600">
              Todo el contenido de este sitio: Copyright &copy; 2025 Universidad
              Pontificia Bolivariana, sus licenciantes y los colaboradores.
              Todos los derechos reservados, incluidos los de extracción de
              texto y datos, entrenamiento de IA y tecnologías similares. Se
              aplican los términos de licencia relevantes a todo el contenido de
              acceso abierto.
            </p>
          </div>

          {/* Links Column */}
          <div className="flex flex-col flex-2">
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="/"
                  className="hover:text-gray-900 text-blue-500 underline"
                >
                  Política de protección de datos de Universidad Pontificia
                  Bolivariana
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-gray-900 text-blue-500 underline"
                >
                  Acerca de la accesibilidad web
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-gray-900 text-blue-500 underline"
                >
                  Reporte vulnerabilidad
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
