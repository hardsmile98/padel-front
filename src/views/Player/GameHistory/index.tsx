import { Container } from "@/src/components"
import styles from './styles.module.css'

const GameHistory = () => {
  return (
    <section 
        className={styles.gameHistory} 
        id="game-history"
    >
        <Container>
          <h2 className={styles.title}>
            История игр в лиге
          </h2>
        </Container>
    </section>
  )
}

export default GameHistory