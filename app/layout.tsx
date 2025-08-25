import type { Metadata } from "next";
import "@/src/assets/styles/fonts.css";
import "@/src/assets/styles/styles.css";
import env from "@/src/env";

export const metadata: Metadata = {
  metadataBase: env.SITE_URL ? new URL(env.SITE_URL) : undefined,
  title: "Расписание игр GoPadel League",
  description: "Расписание игр и их результаты лиги по падел среди предпринимателей, топ-менеджеров и медийных лиц GoPadel League",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
