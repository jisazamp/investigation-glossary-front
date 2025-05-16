import { createFileRoute } from "@tanstack/react-router";
import { Container } from "react-bootstrap";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <Container className="p-2 bg-red-500">
      <p className="text-red-100">Hola mundo</p>
    </Container>
  );
}
