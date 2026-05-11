import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/madrasa-logo.png";
import { useLang, t as dict } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";

type Child = { key: keyof typeof dict };
type Sub = { key: keyof typeof dict; children?: Child[] };
type Item = { key: keyof typeof dict; subs?: Sub[] };

const menu: Item[] = [
  { key: "home" },
  {
    key: "about",
    subs: [{ key: "history" }, { key: "vision" }, { key: "message" }],
  },
  {
    key: "admin",
    subs: [{ key: "managing" }, { key: "principal" }, { key: "staff" }],
  },
  {
    key: "edu",
    subs: [
      { key: "board" },
      {
        key: "curriculum",
        children: [{ key: "hifz" }, { key: "kitab" }, { key: "general" }],
      },
      { key: "classes" },
    ],
  },
  {
    key: "admission",
    subs: [{ key: "apply" }, { key: "fees" }, { key: "scholarship" }],
  },
  {
    key: "coCurricular",
    subs: [{ key: "sports" }, { key: "cultural" }, { key: "competition" }],
  },
  {
    key: "resources",
    subs: [
      {
        key: "multimedia",
        children: [{ key: "videoGallery" }, { key: "photoGallery" }],
      },
      { key: "notice" },
    ],
  },
  { key: "notice" },
  { key: "contact" },
];

function DesktopItem({ item }: { item: Item }) {
  const { tr } = useLang();
  const [open, setOpen] = useState(false);
  const [childOpen, setChildOpen] = useState<string | null>(null);

  if (!item.subs) {
    return (
      <Link
        to={item.key === "home" ? "/" : "/"}
        className="px-3 py-2 text-sm font-semibold text-primary-foreground/95 hover:text-white transition"
      >
        {tr(item.key)}
      </Link>
    );
  }
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { setOpen(false); setChildOpen(null); }}
    >
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-primary-foreground/95 hover:text-white">
        {tr(item.key)} <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full min-w-56 rounded-lg border border-border bg-white py-2 shadow-xl z-50"
          >
            {item.subs.map((s) => (
              <div
                key={s.key}
                className="relative"
                onMouseEnter={() => setChildOpen(s.key)}
                onMouseLeave={() => setChildOpen(null)}
              >
                <button className="flex w-full items-center justify-between px-4 py-2 text-sm text-foreground hover:bg-primary-soft hover:text-primary transition">
                  {tr(s.key)}
                  {s.children && <ChevronDown className="h-3 w-3 -rotate-90" />}
                </button>
                <AnimatePresence>
                  {s.children && childOpen === s.key && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-full top-0 ml-1 min-w-52 rounded-lg border border-border bg-white py-2 shadow-xl"
                    >
                      {s.children.map((c) => (
                        <button
                          key={c.key}
                          className="block w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary-soft hover:text-primary transition"
                        >
                          {tr(c.key)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { tr } = useLang();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="lg:hidden border-t border-primary/30 bg-primary"
    >
      <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
        {menu.map((item) => (
          <div key={item.key}>
            {item.subs ? (
              <button
                onClick={() => setOpen(open === item.key ? null : item.key)}
                className="flex w-full items-center justify-between px-3 py-2 text-sm font-semibold text-white"
              >
                {tr(item.key)}
                <ChevronDown className={`h-4 w-4 transition ${open === item.key ? "rotate-180" : ""}`} />
              </button>
            ) : (
              <Link
                to="/"
                onClick={onClose}
                className="block px-3 py-2 text-sm font-semibold text-white"
              >
                {tr(item.key)}
              </Link>
            )}
            {item.subs && open === item.key && (
              <div className="ml-3 border-l border-white/30 pl-3 py-1 space-y-1">
                {item.subs.map((s) => (
                  <div key={s.key}>
                    <div className="px-2 py-1.5 text-sm text-white/90">{tr(s.key)}</div>
                    {s.children && (
                      <div className="ml-3 border-l border-white/20 pl-3 space-y-1">
                        {s.children.map((c) => (
                          <div key={c.key} className="px-2 py-1 text-xs text-white/80">{tr(c.key)}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link
          to="/donate"
          onClick={onClose}
          className="block mt-2 rounded-md bg-white px-3 py-2 text-center text-sm font-bold text-primary"
        >
          {tr("donate")}
        </Link>
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const { tr } = useLang();
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary-soft/95 backdrop-blur border-b border-primary/20">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="logo" width={56} height={56} className="h-14 w-14 object-contain" />
            <div className="leading-tight">
              <h1 className="text-xl md:text-2xl font-bold text-primary">{tr("schoolName")}</h1>
              <p className="text-xs md:text-sm text-destructive font-semibold">★ {tr("address")} ★</p>
              <p className="text-[11px] md:text-xs text-muted-foreground">{tr("established")}</p>
            </div>
          </Link>
          <div className="hidden md:block">
            <LangToggle />
          </div>
          <button
            className="lg:hidden text-primary"
            onClick={() => setMobile((v) => !v)}
            aria-label="menu"
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 hidden lg:flex items-center justify-between">
          <div className="flex items-center">
            {menu.map((item) => (
              <DesktopItem key={item.key} item={item} />
            ))}
          </div>
          <Link
            to="/donate"
            className="my-2 rounded-md border-2 border-white px-4 py-1.5 text-sm font-bold text-white hover:bg-white hover:text-primary transition"
          >
            {tr("donate")}
          </Link>
        </div>
        <div className="lg:hidden flex justify-center py-2">
          <LangToggle />
        </div>
      </nav>
      <AnimatePresence>{mobile && <MobileMenu onClose={() => setMobile(false)} />}</AnimatePresence>
    </header>
  );
}
