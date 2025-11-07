import { getBranch } from "./_lib/branch";

interface BranchProps {
  in: number;
  name: string;
}

export default async function BranchPage() {
  const branches: unknown = await getBranch();
  return (
    <div>
      <h1>Branch</h1>
    </div>
  );
}
