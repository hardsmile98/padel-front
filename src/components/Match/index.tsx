/* eslint-disable @next/next/no-img-element */
import { GetPlayerBySlugResponse } from "@/src/types";
import Image from "next/image";
import avatarPlaceholder from "@/src/assets/images/avatar-placeholder.webp";
import styles from "./styles.module.css";

function Match({ match }: { match: GetPlayerBySlugResponse["matches"][0] }) {
  return (
    <div className={styles.match}>
      <div className={`${styles.team} ${styles.team1}`}>
        <div className={styles.teamName}>
          <div className={styles.teamPlayer}>
            {match.team1.player1.avatarUrl ? (
              <img
                src={match.team1.player1.avatarUrl}
                alt={match.team1.player1.lastName}
              />
            ) : (
              <Image
                src={avatarPlaceholder}
                alt="player"
                width={48}
                height={48}
              />
            )}

            <span>
              {match.team1.player1.lastName} {match.team1.player1.firstName}
            </span>
          </div>

          <div className={styles.teamPlayer}>
            {match.team1.player2.avatarUrl ? (
              <img
                src={match.team1.player2.avatarUrl}
                alt={match.team1.player2.lastName}
              />
            ) : (
              <Image
                src={avatarPlaceholder}
                alt="player"
                width={48}
                height={48}
              />
            )}

            <span>
              {match.team1.player2.lastName} {match.team1.player2.firstName}
            </span>
          </div>
        </div>

        <div className={styles.teamScore}>
          {match.sets.map((set, index) => {
            const score = set.split("-");

            return <span key={index}>{score[0] || "-"}</span>;
          })}
        </div>
      </div>

      <div className={`${styles.team} ${styles.team2}`}>
        <div className={styles.teamName}>
          <div className={styles.teamPlayer}>
            {match.team2.player1.avatarUrl ? (
              <img
                src={match.team2.player1.avatarUrl}
                alt={match.team2.player1.lastName}
              />
            ) : (
              <Image
                src={avatarPlaceholder}
                alt="player"
                width={48}
                height={48}
              />
            )}

            <span>
              {match.team2.player1.lastName} {match.team2.player1.firstName}
            </span>
          </div>

          <div className={styles.teamPlayer}>
            {match.team2.player2.avatarUrl ? (
              <img
                src={match.team2.player2.avatarUrl}
                alt={match.team2.player2.lastName}
              />
            ) : (
              <Image
                src={avatarPlaceholder}
                alt="player"
                width={48}
                height={48}
              />
            )}

            <span>
              {match.team2.player2.lastName} {match.team2.player2.firstName}
            </span>
          </div>
        </div>

        <div className={styles.teamScore}>
          {match.sets.map((set, index) => {
            const score = set.split("-");

            return <span key={index}>{score[1] || "-"}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Match;
