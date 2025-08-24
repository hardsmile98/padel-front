import env from "@/src/env";
import { GetTournamentsPlayersResponse } from "@/src/types";
import { Main } from "@/src/views";

export default async function Home() {
  let data: GetTournamentsPlayersResponse = [];

  try {
    const res = await fetch(`${env.API_URL}/api/common/tournaments/players`, {
      next: {
        revalidate: 1,
      },
    });

    data = await res?.json() || [];
  } catch (_) {
    data = [];
  }

  return <Main players={data} />;
}
