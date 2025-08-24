import { Container } from "@/src/components";
import styles from "./styles.module.css";
import Image from "next/image";
import logo from "@/src/assets/images/logo.svg";
import gradient from "@/src/assets/images/video-gradient.webp";
import { GetTournamentsPlayersResponse } from "@/src/types";
import ViewPlayers from "./ViewPlayers";

function Players({ players }: { players: GetTournamentsPlayersResponse }) {
  return (
    <section className={styles.players}>
      <div className={styles.background}>
        <Image className={styles.gradient} src={gradient} alt="gradient" />

        <video autoPlay muted loop>
          <source src="/padel.mp4" type="video/mp4" />
        </video>
      </div>

      <Container>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Image width={147} height={14} src={logo} alt="GoPadel League" />
          </div>

          <div className={styles.footer}>
            <div className={styles.playersList}>
              <ViewPlayers players={players} />
            </div>

            <div className={styles.description}>
              <h1>Статистика игр</h1>

              <p>
                Выберите нужную группу{" "}
                <span>, чтобы выбрать, нажмите на таб ниже</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Players;
