import { useMemo, type FC } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CreditsAuthorCardUI,
  type CreditsAuthorCardProps,
} from "@/components/CreditsAuthorCard/index.ui";
import { getInvestigators } from "../utils/investigators/";
import type { AuthorItem } from "@/utils/authors/index.types";
import type { InvestigatorItem } from "@/utils/investigators/index.types";

const AUTHORS: CreditsAuthorCardProps[] = [
  {
    name: "Iván Darío Toro Jaramillo",
    studies: "Doctor en Teología, Doctor en Filosofía, Postdoc en Teología",
    imgSrc:
      "https://mighty-talent-5d6928e29f.media.strapiapp.com/Ivan_Dario_944fd1e19b.jpg",
    description: "Grupo de Investigación en Teología, Religión y Cultura",
    email: "ivandario.toro@upb.edu.co",
    orcidUrl: "https://orcid.org/0000-0002-8639-3567",
    title: "Ph.D.",
  },
  {
    name: "Piedad Felisinda Gañan Rojo",
    studies: "Doctor en Ingeniería de Materiales",
    imgSrc:
      "https://mighty-talent-5d6928e29f.media.strapiapp.com/Piedad_64289cd3dd.jpg",
    description: "Grupo de Investigación sobre Nuevos Materiales - GINUMA",
    email: "piedad.ganan@upb.edu.co",
    orcidUrl: "https://orcid.org/0000-0003-2596-2591",
    title: "Ph.D.",
  },
  {
    name: "Camilo Duque Ortiz",
    studies: "Doctor en Enfermería",
    imgSrc:
      "https://mighty-talent-5d6928e29f.media.strapiapp.com/Camilo_61ad09903d.jpg",
    description: "Grupo de Investigación en Cuidado",
    email: "camilo.duque@upb.edu.co",
    title: "M.Sc.",
  },
  {
    name: "Óscar Eduardo Sánchez García",
    studies:
      "Estudiante de Doctorado en Ingeniería para la Sociedad de la Información y el Desarrollo Sostenible",
    imgSrc:
      "https://mighty-talent-5d6928e29f.media.strapiapp.com/Oscar_E_c38476c7fa.jpg",
    description:
      "Grupo de Investigación y Desarrollo de Aplicaciones en Tecnologías de la Información y la Comunicación - GIDATI",
    email: "oscar.sanchez@upb.edu.co",
    orcidUrl: "https://orcid.org/0000-0003-0243-7057",
    title: "M.Sc.",
  },
  {
    name: "Johanna Marcela Vanegas Munera",
    studies: "Doctor en Epidemiología",
    imgSrc:
      "https://mighty-talent-5d6928e29f.media.strapiapp.com/Johanna_bc9c6dca7e.jpg",
    description: "Grupo de Investigación en Salud Pública",
    email: "johanna.vanegas@upb.edu.co",
    orcidUrl: "https://orcid.org/0000-0003-0649-6660",
    title: "Ph.D.",
  },
];

const getProfilePhotoBasedOnEnv = (url: string) => {
  if (import.meta.env.DEV) return `${import.meta.env.VITE_BASE_URL}${url}`;
  return url;
};

const convertInvestigatorToCreditsAuthor = (
  investigator: InvestigatorItem,
): CreditsAuthorCardProps => ({
  description: investigator.investigationGroup ?? "",
  email: investigator.email,
  imgSrc: getProfilePhotoBasedOnEnv(investigator.profilePhoto.url),
  name: `${investigator.firstName} ${investigator.lastName}`,
  orcidUrl: investigator.orcidUrl,
  studies: investigator.academicFormation ?? "",
  title: investigator.academicTitle,
});

const Credits: FC = () => {
  const {
    data: { data },
  } = Route.useLoaderData();

  const investigators = useMemo(() => {
    return data?.map((d) => convertInvestigatorToCreditsAuthor(d));
  }, [data]);

  return (
    <div className="mt-10 mb-40 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {investigators.map((a) => (
          <CreditsAuthorCardUI key={a.name} {...a} />
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/creditos")({
  component: Credits,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: ["investigators"],
      queryFn: getInvestigators,
    }),
});
