import { Categories } from "@/components/Categories";
import { createFileRoute } from "@tanstack/react-router";
import { getCategories } from "../utils/categories";

export const Route = createFileRoute("/")({
  component: App,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: ["categories"],
      queryFn: getCategories,
    }),
  errorComponent: () => <div>Error</div>,
  pendingComponent: () => <div>Pending</div>,
});

function App() {
  const {
    data: { data },
  } = Route.useLoaderData();

  return (
    <div>
      <Categories categories={data} />
    </div>
  );
}
