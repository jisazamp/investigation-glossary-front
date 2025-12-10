import type { FC } from "react";
import { BreadcrumbItem, SectionBreadCrumb } from "../SectionBreadCrumb";
import { Link } from "@tanstack/react-router";
import { Route } from "@/routes/autores/$authorId";

const AuthorDetail: FC = () => {
  const { authorsData } = Route.useLoaderData();
  const data = authorsData.data.data?.[0];

  return (
    <>
      <div className="mt-4">
        <SectionBreadCrumb>
          <BreadcrumbItem>
            <Link to="/autores">Autores</Link>
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
        <p className="m-0">{data.formation}</p>
        <a className="underline cursor-pointer" href={`mailto:${data.email}`}>
          {data.email}
        </a>
        <p className="mt-10 text-justify">{data.description}</p>
      </div>
    </>
  );
};

export { AuthorDetail };
