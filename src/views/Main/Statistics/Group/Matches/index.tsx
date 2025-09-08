import { Match } from '@/src/components';
import { GetGroupStatisticsResponse } from '@/src/types';
import styles from './styles.module.css';

function Matches({
  played,
  upcoming,
}: {
  played: GetGroupStatisticsResponse['matches'];
  upcoming: GetGroupStatisticsResponse['matches'];
}) {
  return (
    <div className={styles.wrapper}>
      <div>
        <h2 className={styles.title}>Игры</h2>

        {played.length > 0 ? (
          <div className={styles.matches}>
            {played.map((match) => (
              <Match key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>В этой группе еще не было игр</p>
        )}
      </div>

      <div>
        <h2 className={styles.title}>Предстоящие игры</h2>

        {upcoming.length > 0 ? (
          <div className={styles.matches}>
            {upcoming.map((match) => (
              <Match key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Предстоящих игр нет</p>
        )}
      </div>
    </div>
  );
}

export default Matches;
