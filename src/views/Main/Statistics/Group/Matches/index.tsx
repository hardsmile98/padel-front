import { Match } from "@/src/components";
import { GetGroupStatisticsResponse } from "@/src/types";
import styles from "./styles.module.css";

function Matches({
  matches,
}: {
  matches: GetGroupStatisticsResponse["matches"];
}) {
  return (
    <div>
      <h2 className={styles.title}>Игры</h2>

      {matches.length > 0 ? (
        <div className={styles.matches}>
          {matches.map((match) => (
            <Match key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>В этой группе еще не было игр</p>
      )}
    </div>
  );
}

export default Matches;
