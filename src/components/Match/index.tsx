/* eslint-disable @next/next/no-img-element */
import { GetPlayerBySlugResponse } from "@/src/types";
import Image from "next/image";
import avatarPlaceholder from "@/src/assets/images/avatar-placeholder.webp";
import styles from "./styles.module.css";
import Link from "next/link";

function Match({ match }: { match: GetPlayerBySlugResponse["matches"][0] }) {
  return (
    <div className={styles.match}>
      <div className={`${styles.team} ${styles.team1} ${match.winnerId === match.team1.id ? styles.teamWin : ""}`}>
        <div className={styles.teamName}>
          <Link href={`/${match.team1.player1.slug}`} className={styles.teamPlayer}>
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
              {match.team1.player1.firstName} {match.team1.player1.lastName}
            </span>
          </Link>

          <Link href={`/${match.team1.player2.slug}`} className={styles.teamPlayer}>
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
              {match.team1.player2.firstName} {match.team1.player2.lastName}
            </span>
          </Link>
        </div>

        <div className={styles.teamScore}>
          {match.sets.map((set, index) => {
            const score = set.split("-");

            return <span key={index}>{score[0] || "-"}</span>;
          })}
        </div>
      </div>

      <div className={`${styles.team} ${styles.team2} ${match.winnerId === match.team2.id ? styles.teamWin : ""}`}>
        <div className={styles.teamName}>
          <Link href={`/${match.team2.player1.slug}`} className={styles.teamPlayer}>
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
              {match.team2.player1.firstName} {match.team2.player1.lastName}
            </span>
          </Link>

          <Link href={`/${match.team2.player2.slug}`} className={styles.teamPlayer}>
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
              {match.team2.player2.firstName} {match.team2.player2.lastName}
            </span>
          </Link>
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
