import {
  GetActiveTournamentResponse,
  GetTournamentsPlayersResponse,
} from "@/src/types";
import GoToLanding from "./GoToLanding";
import Partners from "./Partners";
import Players from "./Players";
import Statistics from "./Statistics";

function Main({
  players,
  tournament,
}: {
  players: GetTournamentsPlayersResponse;
  tournament: GetActiveTournamentResponse | null;
}) {
  return (
    <>
      <Players players={players} />

      {tournament && <Statistics tournament={tournament} />}

      <Partners />

      <GoToLanding />
    </>
  );
}

export default Main;
