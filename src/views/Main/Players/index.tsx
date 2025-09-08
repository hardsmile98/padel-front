import { Container } from "@/src/components";
import styles from "./styles.module.css";
import { GetTournamentsPlayersResponse } from "@/src/types";
import ViewPlayers from "./ViewPlayers";

function Players({ players }: { players: GetTournamentsPlayersResponse }) {
  return (
    <section className={styles.players}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.footer}>
            <div className={styles.playersList}>
              <ViewPlayers players={players} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Players;
