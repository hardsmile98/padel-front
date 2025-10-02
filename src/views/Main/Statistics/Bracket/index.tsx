/* eslint-disable @typescript-eslint/no-explicit-any */
import env from "@/src/env";
import useSWR from "swr";
import styles from "./styles.module.css";
import { GetCategoryStatisticsResponse } from "@/src/types";
import Match from "./Match";
import Winner from "./Winner";
import Image from "next/image";
import playoff from "@/src/assets/images/playoff.webp";

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data: GetCategoryStatisticsResponse) => {
      const matches = data.matches || [];
      const groups = data.groups || [];

      if (groups.length < 3) {
        return null;
      }

      const groupsMap: Record<string, any[]> = {
        '1/4 финала': matches.filter(m => m.groupId === groups?.[0]?.id),
        '1/2 финала': matches.filter(m => m.groupId === groups?.[1]?.id),
        'Финал': matches.filter(m => m.groupId === groups?.[2]?.id),
        'Победители': [],
      };

      const stages = ['1/4 финала', '1/2 финала', 'Финал'];

      stages.forEach(stage => {
        while (groupsMap[stage].length < 4) {
          groupsMap[stage].push({ groupId: null, team1: null, team2: null, winnerId: null, isEmpty: true });
        }
      });

      const buildNextStageMatches = (prevStageMatches: any[], nextStageMatches: any[], nextGroupId: number) => {
        const winners: any[] = [];
        const losers: any[] = [];

        // Получаем победителей и проигравших предыдущего этапа
        prevStageMatches.forEach(m => {
          if (m.team1 && m.team2) {
            if (m.winnerId === m.team1?.id) {
              winners.push(m.team1);
              losers.push(m.team2);
            } else if (m.winnerId === m.team2?.id) {
              winners.push(m.team2);
              losers.push(m.team1);
            } else {
              // матч ещё не сыгран
              winners.push(null);
              losers.push(null);
            }
          } else {
            winners.push(null);
            losers.push(null);
          }
        });

        // Создаем массив 4 матчей для следующего этапа
        const emptyMatches = [
          { team1: winners[0], team2: winners[1], groupId: nextGroupId },
          { team1: winners[2], team2: winners[3], groupId: nextGroupId },
          { team1: losers[0], team2: losers[1], groupId: nextGroupId },
          { team1: losers[2], team2: losers[3], groupId: nextGroupId },
        ];

        return emptyMatches.map(emptyMatch => {
          if (!emptyMatch.team1 || !emptyMatch.team2) {
            return { ...emptyMatch, winnerId: null, isEmpty: true };
          }

          // ищем реальный матч на бэкенде (учитываем любой порядок команд)
          const realMatch = nextStageMatches.find(m =>
            (m.team1?.id === emptyMatch.team1.id && m.team2?.id === emptyMatch.team2.id) ||
            (m.team1?.id === emptyMatch.team2.id && m.team2?.id === emptyMatch.team1.id)
          );

          if (realMatch) {
            return { ...realMatch, isEmpty: false };
          } else {
            return { ...emptyMatch, winnerId: null, isEmpty: true };
          }
        });
      };

      // Использование
      groupsMap['1/2 финала'] = buildNextStageMatches(
        groupsMap['1/4 финала'],
        matches.filter(m => m.groupId === groups[1].id),
        groups[1].id
      );

      groupsMap['Финал'] = buildNextStageMatches(
        groupsMap['1/2 финала'],
        matches.filter(m => m.groupId === groups[2].id),
        groups[2].id
      );

      // Массив победителей финала
      groupsMap['Победители'] = groupsMap['Финал'].map(m => {
        if (m.team1 && m.team2 && m.winnerId) {
          return m.team1.id === m.winnerId ? m.team1 : m.team2;
        } else {
          return null; // пустое значение, если финал не сыгран
        }
      });

      return groupsMap;
    });

function Bracket({ categoryId }: { categoryId: number }) {
  const { data, error, isLoading } = useSWR(
    `${env.API_URL}/api/common/tournaments/categories/${categoryId}`,
    fetcher
  );

  if (error) {
    return <div className={styles.error}>Ошибка получения данных</div>;
  }

  if (isLoading) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  if (!data) {
    return <div className={styles.error}>Нет данных</div>;
  }

  return (
    <div className={styles.stages}>
      <div className={styles.stage}>
        <h5 className={styles.stageTitle}>
          1/4 финала
        </h5>

        <div className={styles.quarterfinals}>
          {data['1/4 финала'].map((match, index) => (
            <div key={index}>
              <Match match={match} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.stage}>
        <h5 className={styles.stageTitle}>
          1/2 финала
        </h5>

        <div className={styles.semifinals}>
          {data['1/2 финала'].map((match, index) => (
            <div key={index}>
              <Match match={match} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.stage}>
        <h5 className={styles.stageTitle}>
          Финал
        </h5>

        <div className={styles.finals}>
          {data['Финал'].map((match, index) => (
            <div key={index}>
              <Match match={match} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.stage} ${styles.playoffStage}`}>
        <h5 className={styles.stageTitle}></h5>

        <Image
          className={styles.playoff}
          src={playoff}
          alt="Playoff"
          width={250}
          loading="lazy"
        />

        <div className={styles.winners}>
          {data['Победители'].map((winner, index) => (
            <div key={index}>
              <Winner
                winner={winner}
                place={2 * index + 1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bracket;
