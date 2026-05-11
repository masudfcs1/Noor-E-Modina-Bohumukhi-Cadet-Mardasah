import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "bn" | "en";

type Dict = Record<string, { bn: string; en: string }>;

export const t: Dict = {
  schoolName: { bn: "নূর-ই-মদিনা বহুমুখী ক্যাডেট মাদ্রাসা", en: "Noor-E-Modina Bohumukhi Cadet Madrasah" },
  address: { bn: "শাহ্‌ জালাল নগর, লবণচরা, খুলনা।", en: "Shah Jalal Nagar, Labanchara, Khulna." },
  established: { bn: "স্থাপিতঃ ২০১৫ ইং", en: "Established: 2015" },
  home: { bn: "মূল পাতা", en: "Home" },
  donate: { bn: "ডোনেট করুন", en: "Donate" },
  about: { bn: "পরিচিতি", en: "About" },
  history: { bn: "ইতিহাস", en: "History" },
  vision: { bn: "লক্ষ্য ও উদ্দেশ্য", en: "Vision & Mission" },
  message: { bn: "প্রতিষ্ঠাতার বাণী", en: "Founder's Message" },
  admin: { bn: "প্রশাসন", en: "Administration" },
  managing: { bn: "পরিচালনা পর্ষদ", en: "Managing Committee" },
  principal: { bn: "অধ্যক্ষ", en: "Principal" },
  staff: { bn: "শিক্ষক ও কর্মচারী", en: "Teachers & Staff" },
  edu: { bn: "শিক্ষা পরিষদ", en: "Education Council" },
  board: { bn: "মাদ্রাসা শিক্ষা বোর্ড", en: "Madrasa Education Board" },
  curriculum: { bn: "পাঠ্যক্রম", en: "Curriculum" },
  classes: { bn: "শ্রেণীসমূহ", en: "Classes" },
  hifz: { bn: "হিফজ বিভাগ", en: "Hifz Department" },
  kitab: { bn: "কিতাব বিভাগ", en: "Kitab Department" },
  general: { bn: "সাধারণ বিভাগ", en: "General Department" },
  admission: { bn: "ভর্তি ও সহযোগিতা", en: "Admission & Support" },
  apply: { bn: "ভর্তি আবেদন", en: "Apply for Admission" },
  fees: { bn: "ফি কাঠামো", en: "Fee Structure" },
  scholarship: { bn: "বৃত্তি", en: "Scholarship" },
  coCurricular: { bn: "সহপাঠ কার্যক্রম", en: "Co-curricular" },
  sports: { bn: "খেলাধুলা", en: "Sports" },
  cultural: { bn: "সাংস্কৃতিক", en: "Cultural" },
  competition: { bn: "প্রতিযোগিতা", en: "Competition" },
  resources: { bn: "তথ্যকোষ", en: "Resources" },
  multimedia: { bn: "মাল্টিমিডিয়া", en: "Multimedia" },
  videoGallery: { bn: "ভিডিও গ্যালারী", en: "Video Gallery" },
  photoGallery: { bn: "ছবি গ্যালারী", en: "Photo Gallery" },
  notice: { bn: "নোটিশ/বিজ্ঞপ্তি", en: "Notice / Announcement" },
  contact: { bn: "যোগাযোগ", en: "Contact" },
  importantLinks: { bn: "গুরুত্বপূর্ণ লিংক", en: "Important Links" },
  phone: { bn: "মোবাইলঃ ০১৭৯৪৫২৫৪৬৪", en: "Phone: 01794525464" },
  email: { bn: "aminul525464@gmail.com", en: "aminul525464@gmail.com" },
  donateNow: { bn: "এখনই ডোনেট করুন", en: "Donate Now" },
  donateIntro: {
    bn: "আপনার দানে এতিম ও মেধাবী শিক্ষার্থীদের শিক্ষাজীবন আরও সুন্দর হবে। বিকাশের মাধ্যমে সহজেই অনুদান পাঠাতে পারেন।",
    en: "Your donation helps orphan and talented students continue their education. You can easily donate via bKash.",
  },
  scanQr: { bn: "বিকাশ QR স্ক্যান করুন", en: "Scan bKash QR" },
  bkashNumber: { bn: "বিকাশ নাম্বার", en: "bKash Number" },
  donationForm: { bn: "ডোনেশন ফর্ম", en: "Donation Form" },
  formIntro: { bn: "অনুগ্রহ করে নিচের ফর্মটি পূরণ করুন। আপনার তথ্য আমাদের গুগল শিটে সংরক্ষিত হবে।", en: "Please fill out the form below. Your details will be stored in our Google Sheet." },
  fullName: { bn: "পুরো নাম", en: "Full Name" },
  yourEmail: { bn: "ইমেইল", en: "Email" },
  amount: { bn: "পরিমাণ (টাকা)", en: "Amount (BDT)" },
  trxId: { bn: "ট্রানজেকশন আইডি", en: "Transaction ID" },
  message_field: { bn: "বার্তা (ঐচ্ছিক)", en: "Message (optional)" },
  submit: { bn: "জমা দিন", en: "Submit" },
  thanks: { bn: "ধন্যবাদ! আপনার তথ্য জমা হয়েছে।", en: "Thank you! Your details have been submitted." },
  welcomeTitle: { bn: "স্বাগতম", en: "Welcome" },
  welcomeBody: {
    bn: "নূর-ই-মদিনা বহুমুখী মাদ্রাসা ২০১৫ সালে প্রতিষ্ঠিত একটি আদর্শ দ্বীনি ও আধুনিক শিক্ষা প্রতিষ্ঠান। কুরআন, হাদীস ও আধুনিক জ্ঞানের সমন্বয়ে আমরা প্রজন্ম গড়ে তুলছি।",
    en: "Noor-E-Madina Multipurpose Madrasa, established in 2015, is a model institution combining Quran, Hadith, and modern education to shape future generations.",
  },
  ourPrograms: { bn: "আমাদের কার্যক্রম", en: "Our Programs" },
  callToDonate: { bn: "এই মহৎ কাজে অংশীদার হোন", en: "Join Us in This Noble Cause" },
};

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; tr: (k: keyof typeof t) => string }>({
  lang: "bn",
  setLang: () => {},
  tr: (k) => t[k]?.bn ?? String(k),
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("bn");
  const tr = (k: keyof typeof t) => t[k]?.[lang] ?? String(k);
  return <LangCtx.Provider value={{ lang, setLang, tr }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
