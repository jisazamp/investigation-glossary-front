import { Route } from "@/routes/conceptos/$conceptId";
import { Link } from "@tanstack/react-router";
import { useMemo, useEffect, type FC } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BreadcrumbItem, SectionBreadCrumb } from "../SectionBreadCrumb";
import { remarkAutolinkConcepts } from "@/utils/remark";

const ConceptDetail: FC = () => {
  const { conceptsQuery, allConceptNamesQuery } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  const conceptData = conceptsQuery.data?.data?.[0];
  const conceptAuthors = conceptData?.authors ?? [];
  const conceptNames = allConceptNamesQuery.data?.data ?? [];

  const conceptsForPlugin = useMemo(() => {
    return conceptNames.map((c: any) => ({
      name: c.name,
      slug: c.slug ?? String(c.id),
      aliases: c.aliases ?? [],
    }));
  }, [conceptNames]);

  const remarkPlugins = useMemo(
    () => [
      remarkGfm,
      [
        remarkAutolinkConcepts,
        { concepts: conceptsForPlugin, maxLinksPerTerm: 1 },
      ],
    ],
    [conceptsForPlugin],
  );

  useEffect(() => {
    if (!conceptData?.documentId) {
      navigate({ to: "/conceptos" });
    }
  }, [conceptData?.documentId, navigate]);

  if (!conceptData?.documentId) return null;

  return (
    <div className="mt-4">
      <SectionBreadCrumb>
        <BreadcrumbItem>
          <Link to="/conceptos">Conceptos</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isActive>{conceptData.name}</BreadcrumbItem>
      </SectionBreadCrumb>

      <div className="mt-4 px-4 space-y-4 max-w-4xl mx-auto">
        <h1 className="font-bold text-red-500">{conceptData.name}</h1>

        {!!conceptAuthors.length && (
          <div id="authors">
            {conceptAuthors.length > 1 ? "Autores: " : "Autor: "}
            {conceptAuthors.map((a: any, index: number) => (
              <Link
                key={a.id}
                to="/autores/$authorId"
                params={{ authorId: String(a.id) }}
              >
                {index !== conceptAuthors.length - 1
                  ? `${a.firstName} ${a.lastName}, `
                  : `${a.firstName} ${a.lastName}`}
              </Link>
            ))}
          </div>
        )}

        <Markdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={remarkPlugins}
          components={{
            a: ({ href, children }) =>
              href?.startsWith("/conceptos/") ? (
                <Link to={href} style={{ textDecoration: "underline" }}>
                  {children}
                </Link>
              ) : (
                <a href={href}>{children}</a>
              ),
          }}
        >
          {conceptData.content}
        </Markdown>
      </div>
    </div>
  );
};

export { ConceptDetail };
