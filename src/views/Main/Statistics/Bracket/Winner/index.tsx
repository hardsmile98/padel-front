import React from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

type WinnerProps = {
  winner: {
    id: number;
    player1?: {
      id: number;
      slug: string;
      firstName: string;
      lastName: string;
      avatarUrl: string;
    };
    player2?: {
      id: number;
      slug: string;
      firstName: string;
      lastName: string;
      avatarUrl: string;
    };
  } | null;
  place: number;
};

const Winner = ({ winner, place }: WinnerProps) => {
  const placeClass = `place${place}`;

  return (
    <div className={styles.root}>
      <div className={`${styles.winner} ${styles[placeClass]}`}>
        <Link href={`/${winner?.player1?.slug}`} className={styles.winnerName}>
          {winner?.player1?.firstName ? winner?.player1?.firstName[0] + '.' : ''} {winner?.player1?.lastName}
        </Link>

        <Link href={`/${winner?.player2?.slug}`} className={styles.winnerName}>
          {winner?.player2?.firstName ? winner?.player2?.firstName[0] + '.' : ''} {winner?.player2?.lastName}
        </Link>
      </div>

      <h6 className={styles.place}>{place} место</h6>
    </div>
  );
};

export default Winner;
