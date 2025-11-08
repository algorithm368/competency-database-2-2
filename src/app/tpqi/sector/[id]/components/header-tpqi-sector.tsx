interface SectorHeaderProps {
  readonly name: string;
}

export function HeaderSector({ name }: SectorHeaderProps) {
  return (
    <header className="mb-8 space-y-4">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {name}
      </h1>

      <p className="text-base sm:text-lg text-muted-foreground">
        รายละเอียดข้อมูลสาขาวิชาชีพและคุณวุฒิที่เกี่ยวข้อง
      </p>
    </header>
  );
}
