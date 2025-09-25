import { Route } from "@/routes/conceptos/$conceptId";
import { Link } from "@tanstack/react-router";
import { useMemo, useEffect, type FC, useCallback, useState } from "react";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BreadcrumbItem, SectionBreadCrumb } from "../SectionBreadCrumb";
import { remarkAutolinkConcepts } from "@/utils/remark";
import { ConceptButton } from "../ConceptButton/index.view";
import { Modal } from "../Modal/index.view";
import ImageSwiper from "../Carousel/index.ui";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const ConceptDetail: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { conceptsQuery, allConceptNamesQuery } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  const conceptData = conceptsQuery.data?.data?.[0];
  const conceptAuthors = conceptData?.authors ?? [];
  const conceptImages =
    conceptData?.images.map((i) => `${API_BASE_URL}${i.url}`) ?? [];
  const conceptNames = allConceptNamesQuery.data?.data ?? [];

  const handleClose = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen, setIsModalOpen]);

  const conceptsForPlugin = useMemo(() => {
    return conceptNames.map((c: any) => ({
      name: c.name,
      slug: c.slug ?? String(c.id),
      aliases: c.aliases ?? [],
    }));
  }, [conceptNames]);

  const remarkPlugins = useMemo(
    () => [
      remarkMath,
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
    <>
      <div className="mt-4 mb-20">
        <SectionBreadCrumb>
          <BreadcrumbItem>
            <Link to="/conceptos">Conceptos</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>{conceptData.name}</BreadcrumbItem>
        </SectionBreadCrumb>

        <div className="mt-4 px-2 md:px-4 space-y-4 max-w-[720px] mx-auto">
          <h1 className="font-bold text-red-500 text-xl">{conceptData.name}</h1>

          {!!conceptAuthors.length && (
            <div id="authors">
              <span className="text-lg">
                {conceptAuthors.length > 1 ? "Autores: " : "Autor: "}
              </span>
              {conceptAuthors.map((a: any, index: number) => (
                <Link
                  key={a.id}
                  to="/autores/$authorId"
                  params={{ authorId: String(a.id) }}
                  className="text-lg underline"
                >
                  {index !== conceptAuthors.length - 1
                    ? `${a.firstName} ${a.lastName}, `
                    : `${a.firstName} ${a.lastName}`}
                </Link>
              ))}
            </div>
          )}

          <Markdown
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            remarkPlugins={remarkPlugins}
            components={{
              a: ({ href, children }) =>
                href?.startsWith("/conceptos/") ? (
                  <Link to={href} className="underline text-lg">
                    {children}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className="underline text-blue-500 text-lg"
                    target="_blank"
                  >
                    {children}
                  </a>
                ),
              p: ({ children }) => (
                <p className="text-justify text-pretty text-base/6 text-lg">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc px-4 text-lg">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal px-4 text-lg">{children}</ol>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="mx-auto" />
              ),
              h1: ({ children }) => (
                <h1 className="scroll-mt-24 mt-10 mb-4 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="scroll-mt-24 mt-10 mb-3 text-2xl md:text-3xl font-bold leading-snug border-b pb-1">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="scroll-mt-24 mt-8 mb-2 text-xl md:text-2xl font-semibold leading-snug">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="scroll-mt-24 mt-6 mb-2 text-lg md:text-xl font-semibold">
                  {children}
                </h4>
              ),
              h5: ({ children }) => (
                <h5 className="scroll-mt-24 mt-6 mb-1 text-base md:text-lg font-semibold tracking-wide uppercase text-gray-600">
                  {children}
                </h5>
              ),
              h6: ({ children }) => (
                <h6 className="scroll-mt-24 mt-4 mb-1 text-base font-medium text-gray-600">
                  {children}
                </h6>
              ),
            }}
          >
            {conceptData.content}
          </Markdown>

          {!!conceptImages.length && (
            <h6 className="font-semibold text-md mt-10">Recursos asociados:</h6>
          )}

          {!!conceptImages.length && (
            <ConceptButton
              label="Imágenes"
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal open={isModalOpen} title="Imágenes" onClose={handleClose}>
          <ImageSwiper imageUrls={conceptImages} />
        </Modal>
      )}
    </>
  );
};

export { ConceptDetail };
