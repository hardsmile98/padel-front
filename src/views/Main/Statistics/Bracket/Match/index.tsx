import React from 'react'
import styles from './styles.module.css';
import Link from 'next/link';


type Match = {
    groupId: number | null;
    team1: {
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
    team2: {
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
    winnerId: number | undefined;
    sets: string[] | undefined;
    isEmpty: boolean;
}

function Match({ match }: { match: Match }) {
    return (
        <div className={styles.match}>
            <div className={`${styles.team} ${match.winnerId && match.winnerId === match.team1?.id ? styles.winner : ""}`}>
                <div className={styles.teamName}>
                    <Link href={`/${match.team1?.player1?.slug}`}>
                        {match.team1?.player1?.firstName ? `${match.team1?.player1?.firstName?.[0]}.` : ""} {match.team1?.player1?.lastName}
                    </Link>
                    <Link href={`/${match.team1?.player2?.slug}`}>
                        {match.team1?.player2?.firstName ? `${match.team1?.player2?.firstName?.[0]}.` : ""} {match.team1?.player2?.lastName}
                    </Link>
                </div>

                <div className={styles.teamScore}>
                    {match.sets?.map((set, index) => {
                        const score = set.split("-");
                        return <span key={index}>{score[0] || "-"}</span>;
                    })}
                </div>
            </div>

            <div className={`${styles.team} ${match.winnerId && match.winnerId === match.team2?.id ? styles.winner : ""}`}>
                <div className={styles.teamName}>
                    <Link href={`/${match.team2?.player1?.slug}`}>
                        {match.team2?.player1?.firstName ? `${match.team2?.player1?.firstName?.[0]}.` : ""} {match.team2?.player1?.lastName}
                    </Link>
                    <Link href={`/${match.team2?.player2?.slug}`}>
                        {match.team2?.player2?.firstName ? `${match.team2?.player2?.firstName?.[0]}.` : ""} {match.team2?.player2?.lastName}
                    </Link>
                </div>

                <div className={styles.teamScore}>
                    {match.sets?.map((set, index) => {
                        const score = set.split("-");
                        return <span key={index}>{score[1] || "-"}</span>;
                    })}
                </div>
            </div>
        </div>
    )
}

export default Match
