import type { FC } from "react";
import upbLogo from "../../../upb-logo.webp";

const Logo: FC = () => {
  return (
    <div className="flex items-center bg-primary gap-4">
      <img
        alt="Universidad Pontificia Bolivariana"
        src={upbLogo}
        className="h-12 lg:h-16 w-auto"
      />
      <div
        className="hidden sm:block mx-2 bg-gray-400 opacity-50"
        style={{ width: "2px", height: "55px" }}
      />
      <div className="hidden sm:flex flex-col text-black font-bold leading-snug lg:text-xl">
        <span>Diccionario</span>
        <span>de investigación</span>
      </div>
    </div>
  );
};

export { Logo };
