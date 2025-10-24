import { notFound } from "next/navigation";
import { getBranchById } from "../_lib/branch";

interface BranchPageProps {
  readonly params: Promise<{ id: string }>;
}

export default async function BranchDetailPage({ params }: BranchPageProps) {
  const { id: idParam } = await params;

  // Validate id from params
  const id = Number(idParam);

  if (!idParam || Number.isNaN(id) || id <= 0) {
    notFound();
  }

  const branch_data = await getBranchById(Number(id));
  return (
    <main className="w-full min-h-screen bg-background">
      <h1>{branch_data?.name ?? `Branch ID: ${id}`}</h1>
    </main>
  );
}
