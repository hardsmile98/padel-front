import { GetPlayerBySlugResponse } from '@/src/types'
import About from './About'
import GameHistory from './GameHistory'

const Player = ({ data }: { data: GetPlayerBySlugResponse }) => {

  return (
    <>
      <About player={data.player} />

      <GameHistory matches={data.matches} />
    </>
  )
}

export default Player