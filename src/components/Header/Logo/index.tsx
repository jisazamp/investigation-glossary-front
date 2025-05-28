import type { FC } from "react";
import upbLogo from "../../../upb-logo.webp";

const Logo: FC = () => {
  return (
    <div className="flex items-center bg-primary">
      <img
        alt="Universidad Pontificia Bolivariana"
        src={upbLogo}
        className="h-10 w-auto"
      />
      <div
        className="hidden sm:block mx-2 bg-gray-400 opacity-50"
        style={{ width: "1.5px", height: "50px" }}
      />
      <div className="hidden sm:flex flex-col text-black text-sm font-bold leading-snug">
        <span>Diccionario</span>
        <span>de investigación</span>
      </div>
    </div>
  );
};

export { Logo };
