import {
  BreadcrumbItem,
  SectionBreadCrumb,
} from "@/components/SectionBreadCrumb";
import { getInvestigadorById } from "@/utils/investigators";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { FC } from "react";

const InvestigadorDetail: FC = () => {
  const { investigadorData } = Route.useLoaderData();
  const data = investigadorData.data.data?.[0];

  return (
    <>
      <div className="mt-4">
        <SectionBreadCrumb>
          <BreadcrumbItem>
            <Link to="/creditos">Créditos</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>
            {data.firstName} {data.lastName}
          </BreadcrumbItem>
        </SectionBreadCrumb>
      </div>

      <div className="mt-4 px-2 md:px-4 space-y-4 max-w-[720px] mx-auto">
        <h1 className="font-bold text-2xl m-0">
          {data.firstName} {data.lastName}
        </h1>
        <p className="m-0">{data.academicFormation}</p>
        <a className="underline cursor-pointer">{data.email}</a>
      </div>
    </>
  );
};

export const Route = createFileRoute("/creditos/$investigatorId")({
  component: InvestigadorDetail,
  loader: async ({ context: { queryClient }, params }) => {
    const { investigatorId } = params;
    const investigadorData = await queryClient.ensureQueryData({
      queryKey: [`investigador-${investigatorId}`, investigatorId],
      queryFn: () => getInvestigadorById(parseInt(investigatorId)),
    });

    return { investigadorData };
  },
});
