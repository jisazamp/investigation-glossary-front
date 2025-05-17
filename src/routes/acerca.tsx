import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";

const About: FC = () => {
  return <div>Acerca de</div>;
};

export const Route = createFileRoute("/acerca")({
  component: About,
});
