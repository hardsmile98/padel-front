/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { GetTournamentsPlayersResponse } from "@/src/types";
import styles from "./styles.module.css";
import Image from "next/image";
import close from "@/src/assets/images/close-icon.svg";
import Link from "next/link";
import avatarPlaceholder from "@/src/assets/images/avatar-placeholder.webp";

function ViewPlayers({ players }: { players: GetTournamentsPlayersResponse }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        disabled={players.length === 0}
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
      >
        Посмотреть игроков
      </button>

      <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
        <div className={styles.modalContent}>
          <button
            className={styles.modalClose}
            onClick={() => setIsOpen(false)}
          >
            <Image src={close} alt="close" />
          </button>

          <div className={styles.modalBody}>
            <div className={styles.playersList}>
              {players.map((player) => (
                <div key={player.id} className={styles.player}>
                  {player.avatarUrl ? (
                    <img src={player.avatarUrl} alt={player.firstName} />
                  ) : (
                    <Image src={avatarPlaceholder} alt="avatar" />
                  )}

                  <div className={styles.info}>
                    <h6>
                      {player.firstName} {player.lastName}
                    </h6>

                    <Link href={`/${player.slug}`}>Посмотреть карточку</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPlayers;
