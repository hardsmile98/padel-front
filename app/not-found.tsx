import { Metadata } from "next";
import { NotFoundPage } from "@/src/views";
import env from "@/src/env";

export const metadata: Metadata = {
    metadataBase: env.SITE_URL ? new URL(env.SITE_URL) : undefined,
    title: "Страница не найдена",
    description: "Страница не найдена",
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: "Расписание игр GoPadel League ",
      description: "Расписание игр и их результаты лиги по падел среди предпринимателей, топ-менеджеров и медийных лиц GoPadel League",
      images: ["/og-image.jpg"],
      type: "website",
      siteName: "GoPadel League",
      locale: "ru_RU",
      countryName: "Россия",
    },
  };

export default function NotFound() {
  return <NotFoundPage />;
}