import { GetTournamentsPlayersResponse } from "@/src/types"
import GoToLanding from "./GoToLanding"
import Partners from "./Partners"
import Players from "./Players"

function Main({ players }: { players: GetTournamentsPlayersResponse }) {
  return (
    <>
        <Players players={players} />

        <Partners />

        <GoToLanding />
    </>
  )
}

export default Main