import env from "@/src/env";
import { GetActiveTournamentResponse, GetTournamentsPlayersResponse } from "@/src/types";
import { Main } from "@/src/views";

const revalidate = 1;

export default async function Home() {
  let players: GetTournamentsPlayersResponse = [];

  let tournament: GetActiveTournamentResponse | null = null;

  try {
    const res = await fetch(`${env.API_URL}/api/common/tournaments/players`, {
      next: {
        revalidate,
      },
    });

    players = await res?.json() || [];
  } catch (_) {
    players = [];
  }

  try {
    const res = await fetch(`${env.API_URL}/api/common/tournaments/active`, {
      next: {
        revalidate,
      },
    });

    tournament = await res?.json() || null;
  } catch (_) {
    tournament = null;
  }

  return <Main players={players} tournament={tournament} />;
}
