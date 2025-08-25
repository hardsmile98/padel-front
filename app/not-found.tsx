import { Metadata } from "next";
import { NotFoundPage } from "@/src/views";

export const metadata: Metadata = {
    title: "Страница не найдена",
    description: "Страница не найдена",
  };

export default function NotFound() {
  return <NotFoundPage />;
}