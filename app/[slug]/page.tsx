import notFound from "@/app/not-found";
import env from "@/src/env";
import { Player } from "@/src/views";
import type { Metadata } from "next";

export async function generateMetadata({ params: awaitedParams }: { 
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const params = await awaitedParams;

    const { slug } = params;

    const res = await fetch(`${env.API_URL}/api/common/get-player-by-slug/${slug}`, {
      next: { revalidate: 60 * 5 },
    });

    const data = await res.json();

    if (!res.ok || !data?.player) {
      return {
        title: "Игрок не найден",
        description: "Нет информации о данном игроке",
      };
    }

    const { firstName, lastName } = data.player;

    const title = `${firstName} ${lastName}`;

    const description = data.player.description 
    ? data.player.description.join(' ') 
    : 'Участник сезона GoPadel League';

    return {
      title,
      description,
      openGraph: {
        title,
        description: 'Участник сезона GoPadel League',
        type: "website",
        siteName: "GoPadel League",
        locale: "ru_RU",
        countryName: "Россия",
      },
    };
  } catch (_) {
    return {
      title: "Игрок не найден",
      description: "Нет информации о данном игроке",
    };
  }
}

export async function generateStaticParams() {
  try {

  const res = await fetch(`${env.API_URL}/api/common/get-players`, {
    next: {
      revalidate: 60 * 5,
    },
  });

  const players = await res.json();

  if(!res.ok) {
    return [];
  }

  return players.map((player: { slug: string }) => ({
      slug: player.slug,
  }));
  } catch (_) {
    return [];
  }
}


export default async function PlayerPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const res = await fetch(`${env.API_URL}/api/common/get-player-by-slug/${slug}`, {
    next: {
      revalidate: 60 * 5,
    },
  });

  const data = await res.json();

  if(!res.ok || !data?.player) {
    return notFound();
  }

  return <Player data={data} />;
}
