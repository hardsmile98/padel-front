import { GetPlayerBySlugResponse } from '@/src/types'
import About from './About'
import GameHistory from './GameHistory'

const Player = ({ data }: { data: GetPlayerBySlugResponse }) => {

  return (
    <>
      <About data={data} />

      <GameHistory />
    </>
  )
}

export default Player