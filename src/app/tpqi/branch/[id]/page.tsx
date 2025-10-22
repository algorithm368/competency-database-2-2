import { getBranch } from "../_lib/branch";

interface BranchProps {
  in: number;
  name: string;
}

export default async function BranchPage({ params }: BranchProps) {
  const branchs: BranchProps = await getBranch();
  const params = await params;

  return (
    <div>
      <h1>Branch</h1>
    </div>
  );
}
