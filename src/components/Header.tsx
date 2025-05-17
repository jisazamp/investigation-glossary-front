import { Link, useRouterState } from "@tanstack/react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Logo } from "./Logo";

export default function Header() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  const navLinkStyle = (path: string) => {
    return `nav-link px-3 py-2 ${
      currentPath === path
        ? "text-danger border-bottom border-danger"
        : "text-dark border-0"
    } link-hover`;
  };

  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        <Logo />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className={navLinkStyle("/")}>
              Inicio
            </Link>
            <Link to="/creditos" className={navLinkStyle("/creditos")}>
              Créditos
            </Link>
            <Link to="/acerca" className={navLinkStyle("/acerca")}>
              Acerca de
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
