import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { BookOpen, Users, Award, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "মূল পাতা — নূর-ই-মদিনা বহুমুখী মাদ্রাসা" },
      { name: "description", content: "Welcome to Noor-E-Madina Multipurpose Madrasa." },
    ],
  }),
  component: Index,
});

function Index() {
  const { tr } = useLang();
  const cards = [
    { icon: BookOpen, key: "curriculum" as const },
    { icon: Users, key: "staff" as const },
    { icon: Award, key: "scholarship" as const },
    { icon: Heart, key: "coCurricular" as const },
  ];
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-soft to-background">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-primary"
          >
            {tr("welcomeTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto"
          >
            {tr("welcomeBody")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-primary-foreground font-semibold shadow-lg hover:scale-105 transition"
            >
              <Heart className="h-5 w-5" /> {tr("callToDonate")}
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">{tr("ourPrograms")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-primary/20 bg-card p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-primary-soft text-primary">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{tr(c.key)}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
