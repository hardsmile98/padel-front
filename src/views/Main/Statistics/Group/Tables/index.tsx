/* eslint-disable react/jsx-key */
import { TeamStats } from "@/src/types";
import styles from "./styles.module.css";

function Tables({ stats }: { stats: TeamStats[] }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Место</th>
            <th>Участники</th>
            {stats.map((t) => (
              <th key={t.teamId} className={styles.verticalText}>
                {t.name}
              </th>
            ))}
            <th>Игры</th>
            <th>Сеты</th>
            <th>Геймы</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((team, idx) => (
            <tr key={team.teamId}>
              <td>{idx + 1}</td>
              <td>{team.name}</td>
              {stats.map((opponent) =>
                team.teamId === opponent.teamId ? (
                  <td key={opponent.teamId} className={styles.empty}></td>
                ) : (
                  <td
                    key={opponent.teamId}
                    className={
                      team.results[opponent.teamId] === "W"
                        ? styles.win
                        : styles.loss
                    }
                  >
                    {team.results[opponent.teamId]}
                  </td>
                )
              )}
              <td>
                {team.wins}-{team.losses}
              </td>
              <td>
                {team.setsWon}-{team.setsLost}
              </td>
              <td>
                {team.gamesWon}-{team.gamesLost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
