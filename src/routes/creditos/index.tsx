import { useMemo, type FC } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CreditsAuthorCardUI,
  type CreditsAuthorCardProps,
} from "@/components/CreditsAuthorCard/index.ui";
import { getInvestigators } from "@/utils/investigators";
import type { InvestigatorItem } from "@/utils/investigators/index.types";

const getProfilePhotoBasedOnEnv = (url: string) => {
  if (import.meta.env.DEV) return `${import.meta.env.VITE_BASE_URL}${url}`;
  return url;
};

const convertInvestigatorToCreditsAuthor = (
  investigator: InvestigatorItem,
): CreditsAuthorCardProps => ({
  description: investigator.investigationGroup ?? "",
  email: investigator.email,
  id: investigator.id ?? 0,
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
          <Link
            to="/creditos/$investigatorId"
            params={{ investigatorId: a.id?.toString() ?? "0" }}
          >
            <CreditsAuthorCardUI key={a.name} {...a} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/creditos/")({
  component: Credits,
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: ["investigators"],
      queryFn: getInvestigators,
    }),
});
