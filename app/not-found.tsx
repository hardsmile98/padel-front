import { Metadata } from "next";
import { NotFoundPage } from "@/src/views";

export const metadata: Metadata = {
    title: "Страница не найдена",
    description: "Страница не найдена",
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: "Расписание игр GoPadel League ",
      description: "Расписание игр и их результаты лиги по падел среди предпринимателей, топ-менеджеров и медийных лиц GoPadel League",
      images: ["/og-image.png"],
      type: "website",
      siteName: "GoPadel League",
      locale: "ru_RU",
      countryName: "Россия",
    },
  };

export default function NotFound() {
  return <NotFoundPage />;
}