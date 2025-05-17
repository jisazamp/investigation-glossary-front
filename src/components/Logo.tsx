import { Link } from "@tanstack/react-router";
import type { FC } from "react";
import { Navbar } from "react-bootstrap";
import upbLogo from "../upb-logo.webp";

const Logo: FC = () => {
  return (
    <Navbar.Brand as={Link} to="/" className="me-2">
      <div className="d-flex align-items-center gap-2 gap-md-3">
        <img
          alt="Universidad Pontificia Bolivariana"
          src={upbLogo}
          style={{ height: "40px", width: "auto" }}
          className="d-inline-block d-md-block"
        />
        <div
          className="vr bg-gray opacity-50 d-none d-sm-block"
          style={{ height: "50px" }}
        />
        <div className="d-flex flex-column lh-sm text-black small text-md-base">
          <span>Diccionario</span>
          <span>de investigación</span>
        </div>
      </div>
    </Navbar.Brand>
  );
};

export { Logo };
