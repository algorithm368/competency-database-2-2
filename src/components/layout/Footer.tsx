import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const links = [
  { label: "About", href: "/about", external: false },
  { label: "Reference", href: "/reference", external: false },
  {
    label: "TPQI Standard",
    href: "https://www.tpqi.go.th/th/standard/rQNWewEb3Q",
    external: true,
  },
  { label: "SFIA Online", href: "https://sfia-online.org/en", external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-sm py-8 mt-auto border-t" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <div
              style={{
                background: "var(--card)",
                color: "var(--card-foreground)",
              }}
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
              aria-hidden
            >
              <span className="font-bold text-xl">C</span>
            </div>

            <div>
              <div className="text-xl font-bold">Competency</div>
              <div className="text-primary text-xs">Database System</div>
            </div>
          </div>

          <nav
            className="flex flex-wrap justify-center md:justify-end gap-6 text-center"
            aria-label="Footer navigation"
          >
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors duration-200"
                >
                  <span className="text-primary">{l.label}</span>
                  <ExternalLink className="w-3 h-3 text-primary" />
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-primary transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-primary text-center md:text-left">
            <a
              className="transition-colors duration-200"
              href="https://ecpe.nu.ac.th"
              target="_blank"
              rel="noopener noreferrer"
            >
              © {year} Department of Electrical and Computer Engineering
            </a>
            <div className="text-xs text-primary">
              Faculty of Engineering, Naresuan University
            </div>
          </div>

          <div className="flex items-center gap-4 text-primary text-xs">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5a1 1 0 112 0v3.691l1.802 1.802a1 1 0 11-1.414 1.414l-2.293-2.293A1 1 0 019 8.586V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Version 2.0</span>
            </div>

            <div>Built with React</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
