import { useLang } from "@/lib/i18n";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex rounded-full border border-primary/30 bg-white p-0.5 text-xs font-semibold shadow-sm">
      <button
        onClick={() => setLang("bn")}
        className={`px-3 py-1 rounded-full transition ${lang === "bn" ? "bg-primary text-primary-foreground" : "text-primary"}`}
      >
        বাংলা
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full transition ${lang === "en" ? "bg-primary text-primary-foreground" : "text-primary"}`}
      >
        EN
      </button>
    </div>
  );
}
