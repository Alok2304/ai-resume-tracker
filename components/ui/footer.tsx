import Link from "next/link";

const links = [
  // Footer links mirror the major landing-page anchors for quick section navigation.
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "Workflow" },
  { href: "#upload", label: "Upload" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        {/* Closing brand block keeps the page grounded after the final CTA. */}
        <div>
          <Link href="/" className="text-base font-semibold text-slate-950">
            CareerFlow
          </Link>
          <p className="mt-2">AI resume review and job tracking for focused career moves.</p>
        </div>
        <nav className="flex flex-wrap gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
