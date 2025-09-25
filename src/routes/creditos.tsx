import {
  CreditsAuthorCardUI,
  type CreditsAuthorCardProps,
} from "@/components/CreditsAuthorCard/index.ui";
import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";

const BASE_AUTHOR: CreditsAuthorCardProps = {
  imgSrc:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  description: "Lorem ipsum dolor amet",
  name: "Nombre del autor",
  studies: "Doctor del estudio",
  email: "emaildelautor@mail.com",
  title: "Ph.D.",
};

let AUTHORS: CreditsAuthorCardProps[] = [];
for (let i = 0; i < 8; i++) {
  AUTHORS.push(BASE_AUTHOR);
}

const Credits: FC = () => {
  return (
    <div className="mt-10 mb-40 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {AUTHORS.map((a) => (
          <CreditsAuthorCardUI key={a.name} {...a} />
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/creditos")({
  component: Credits,
});
