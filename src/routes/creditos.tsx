import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";

const Credits: FC = () => {
  return <div>Créditos</div>;
};

export const Route = createFileRoute("/creditos")({
  component: Credits,
});
