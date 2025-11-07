import { getOccupationById } from "./_lib/occupation";

interface OccupationPageProps {
  readonly params: Promise<{ id: string }>;
}

export default async function OccupationDetailPage({
  params,
}: OccupationPageProps) {
  const { id: idParam } = await params;

  const id: number = Number(idParam);

  const occupation_data = await getOccupationById(id);

  console.log(occupation_data);
}
