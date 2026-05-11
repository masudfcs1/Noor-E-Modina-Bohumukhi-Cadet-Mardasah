import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/madrasa-logo.png";
import { useLang, t as dict } from "@/lib/i18n";

const links: (keyof typeof dict)[] = [
  "board", "edu", "curriculum", "staff", "managing", "admission",
  "multimedia", "videoGallery", "photoGallery", "resources",
];

export function Footer() {
  const { tr } = useLang();
  return (
    <footer className="bg-primary-soft border-t border-primary/20 mt-12">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <img src={logo} alt="logo" width={80} height={80} className="h-20 w-20 object-contain" loading="lazy" />
          <h3 className="mt-3 font-bold text-primary">{tr("schoolName")}</h3>
          <p className="text-sm text-foreground/80 mt-2 flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" /> {tr("address")}
          </p>
          <p className="text-sm text-foreground/80 mt-1">{tr("established")}</p>
          <p className="text-sm text-foreground/80 mt-1 flex items-center gap-2"><Mail className="h-4 w-4" /> {tr("email")}</p>
          <p className="text-sm text-foreground/80 mt-1 flex items-center gap-2"><Phone className="h-4 w-4" /> {tr("phone")}</p>
          <div className="mt-3 flex gap-2">
            <a href="#" className="grid place-items-center h-9 w-9 rounded bg-[#1877F2] text-white"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="grid place-items-center h-9 w-9 rounded bg-[#1DA1F2] text-white"><Twitter className="h-4 w-4" /></a>
            <a href="https://www.youtube.com/@noor-e-modinabohumukhimadr8528/featured" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid place-items-center h-9 w-9 rounded bg-[#FF0000] text-white"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-primary text-lg mb-4">{tr("importantLinks")}</h3>
          <ul className="space-y-2 text-sm">
            {links.map((k) => (
              <li key={k}>
                <a href="#" className="text-foreground/80 hover:text-primary transition">• {tr(k)}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link
            to="/donate"
            className="block w-full text-center rounded-md bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg hover:opacity-90 transition"
          >
            {tr("donate")}
          </Link>
          <div className="mt-4 rounded-lg overflow-hidden border border-primary/20 aspect-video">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Labanchara,Khulna&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-primary/20 py-3 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {tr("schoolName")}
      </div>
    </footer>
  );
}
