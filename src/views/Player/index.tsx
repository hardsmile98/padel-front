import { GetPlayerBySlugResponse } from '@/src/types'
import About from './About'

const Player = ({ data }: { data: GetPlayerBySlugResponse }) => {

  return (
    <About data={data} />
  )
}

export default Player