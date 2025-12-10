import { AuthorDetail } from "@/components/AuthorDetail";
import { getAuthorById } from "@/utils/authors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/autores/$authorId")({
  component: AuthorDetail,
  loader: async ({ context: { queryClient }, params }) => {
    const { authorId } = params;
    const authorData = await queryClient.ensureQueryData({
      queryKey: [`author-${authorId}`],
      queryFn: () => getAuthorById(parseInt(authorId)),
    });

    return { authorsData: authorData };
  },
});
