import type { FC } from "react";
import upbLogo from "../upb-logo.webp";

const Logo: FC = () => {
  return (
    <div className="flex bg-primary">
      <img
        alt="Universidad Pontificia Bolivariana"
        src={upbLogo}
        style={{ height: "40px", width: "auto" }}
        className="d-inline-block d-md-block"
      />
      <div
        className="vr bg-gray opacity-50 d-none d-sm-block"
        style={{ height: "50px", width: "1.5px" }}
      />
      <div
        className="d-flex flex-column lh-sm text-black small text-md-base"
        style={{ fontWeight: "bold" }}
      >
        <span>Diccionario</span>
        <span>de investigación</span>
      </div>
    </div>
  );
};

export { Logo };
