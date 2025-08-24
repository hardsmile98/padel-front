import { Container, Match } from "@/src/components";
import styles from "./styles.module.css";
import { GetPlayerBySlugResponse } from "@/src/types";

const GameHistory = ({
  matches,
}: {
  matches: GetPlayerBySlugResponse["matches"];
}) => {
  return (
    <section className={styles.gameHistory} id="game-history">
      <Container>
        <h2 className={styles.title}>История игр в лиге</h2>

        {matches.length > 0 ? (
          <div className={styles.matches}>
            {matches.map((match) => (
              <Match key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>История игр пуста</p>
        )}
      </Container>
    </section>
  );
};

export default GameHistory;
