import { Route } from "@/routes/conceptos/$conceptId";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { BreadcrumbItem, SectionBreadCrumb } from "../SectionBreadCrumb";

const ConceptDetail: FC = () => {
  const { conceptsQuery } = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const conceptData = conceptsQuery.data.data?.[0];

  if (!conceptData?.documentId) navigate({ to: "/conceptos" });

  return (
    <div className="mt-4">
      <SectionBreadCrumb>
        <BreadcrumbItem>
          <Link to="/conceptos">Conceptos</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isActive={true}>{conceptData.name}</BreadcrumbItem>
      </SectionBreadCrumb>

      <div className="mt-4 px-4 space-y-4 max-w-4xl mx-auto">
        <h1 className="font-bold text-red-500">{conceptData.name}</h1>
        <Markdown rehypePlugins={[rehypeRaw]}>{conceptData.content}</Markdown>
      </div>
    </div>
  );
};

export { ConceptDetail };
