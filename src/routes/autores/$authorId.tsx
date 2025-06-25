import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/autores/$authorId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authorId } = Route.useParams();
  return <div>Hello {authorId}!</div>;
}
