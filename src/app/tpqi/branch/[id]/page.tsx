import { getBranchById } from "../_lib/branch";

export default async function BranchDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const branch_data = await getBranchById(Number(id));

  console.log(branch_data);

  return (
    <main className="w-full min-h-screen bg-background">
      <h1>{branch_data?.name ?? `Branch ID: ${id}`}</h1>
    </main>
  );
}
