import { Button } from "@/components/ui/button";

export default function DesktopNavbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-sm">
      <div className="text-xl font-bold">Logo</div>
      <div className="flex gap-4">
        <Button variant="link">Home</Button>
        <Button variant="link">About</Button>
        <Button variant="link">Contact</Button>
      </div>
    </nav>
  );
}
