import { Authors } from "@/components/Authors";
import { getAuthors } from "@/utils/authors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/autores/")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    const authorsData = await queryClient.ensureQueryData({
      queryKey: ["authors"],
      queryFn: getAuthors,
    });

    return { authorsData };
  },
});

function RouteComponent() {
  const { authorsData } = Route.useLoaderData();

  return <Authors authors={authorsData.data.data} />;
}
