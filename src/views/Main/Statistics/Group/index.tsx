import { Loader } from '@/src/components';
import env from '@/src/env';
import useSWR from 'swr';
import styles from './styles.module.css';
import { GetGroupStatisticsResponse, TeamStats } from '@/src/types';
import Matches from './Matches';
import Tables from './Tables';

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data: GetGroupStatisticsResponse) => {
      const stats: Record<number, TeamStats> = data?.teams?.reduce((acc, t) => {
        acc[t.id] = {
          teamId: t.id,
          team: [
            {
              name: `${t.player1.firstName[0]}. ${t.player1.lastName}`,
              slug: t.player1.slug,
            },
            {
              name: `${t.player2.firstName[0]}. ${t.player2.lastName}`,
              slug: t.player2.slug,
            },
          ],
          results: {},
          wins: 0,
          losses: 0,
          setsWon: 0,
          setsLost: 0,
          gamesWon: 0,
          gamesLost: 0,
        };
        return acc;
      }, {} as Record<number, TeamStats>);

      const parseSets = (sets: string[]) =>
        sets
          ?.map((s) => s.split('-').map(Number))
          .filter(([a, b]) => !isNaN(a) && !isNaN(b));

      data?.matches?.forEach((m) => {
        const team1 = stats[m.team1.id];
        const team2 = stats[m.team2.id];

        const parsed = parseSets(m.sets);
        const team1Games = parsed.reduce((sum, [a]) => sum + a, 0);
        const team2Games = parsed.reduce((sum, [, b]) => sum + b, 0);

        const team1SetsWon = parsed.filter(([a, b]) => a > b).length;
        const team2SetsWon = parsed.filter(([a, b]) => b > a).length;

        if (m.winnerId === m.team1.id) {
          team1.wins++;
          team2.losses++;
          team1.results[team2.teamId] = 'W';
          team2.results[team1.teamId] = 'L';
        } else {
          team2.wins++;
          team1.losses++;
          team2.results[team1.teamId] = 'W';
          team1.results[team2.teamId] = 'L';
        }

        team1.setsWon += team1SetsWon;
        team1.setsLost += team2SetsWon;
        team2.setsWon += team2SetsWon;
        team2.setsLost += team1SetsWon;

        team1.gamesWon += team1Games;
        team1.gamesLost += team2Games;
        team2.gamesWon += team2Games;
        team2.gamesLost += team1Games;
      });

      const sortedStats = Object.values(stats).sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;

        if (b.setsWon !== a.setsWon) return b.setsWon - a.setsWon;

        return b.gamesWon - a.gamesWon;
      });

      return {
        ...data,
        stats: sortedStats,
      };
    });

function Group({ groupId }: { groupId: number }) {
  const { data, error, isLoading } = useSWR(
    `${env.API_URL}/api/common/tournaments/groups/${groupId}`,
    fetcher
  );

  if (error) {
    return <div className={styles.error}>Ошибка получения данных</div>;
  }

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader />

        <p>Загрузка статистики группы...</p>
      </div>
    );
  }

  return (
    <div className={styles.group}>
      <div className={styles.tables}>
        <Tables stats={data?.stats ?? []} />
      </div>

      <div>
        <Matches matches={data?.matches ?? []} />
      </div>
    </div>
  );
}

export default Group;
