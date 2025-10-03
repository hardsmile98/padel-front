/* eslint-disable @typescript-eslint/no-explicit-any */
import env from '@/src/env';
import useSWR from 'swr';
import styles from './styles.module.css';
import { GetCategoryStatisticsResponse } from '@/src/types';
import Match from './Match';
import Winner from './Winner';
import Image from 'next/image';
import playoff from '@/src/assets/images/playoff.webp';

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data: GetCategoryStatisticsResponse) => {
      const matches = data.matches || [];

      const groups = data.groups || [];

      const mainMatches = matches.filter((m) => m.type === null);

      const extraMatches = matches.filter((m) => m.type === 'extra');

      if (groups.length < 3) {
        return null;
      }

      const groupsMap: Record<string, any[]> = {};

      groups.forEach((group) => {
        groupsMap[group.name] = mainMatches.filter(
          (m) => m.groupId === group.id
        );
      });

      Object.keys(groupsMap).forEach((name) => {
        while (groupsMap[name].length < 4) {
          groupsMap[name].push({
            groupId: null,
            team1: null,
            team2: null,
            winnerId: null,
            isEmpty: true,
          });
        }
      });

      const finalGroup = groups[groups.length - 1];

      const winners = finalGroup
        ? groupsMap[finalGroup.name].map((m) => {
            if (m.team1 && m.team2 && m.winnerId) {
              return m.team1.id === m.winnerId ? m.team1 : m.team2;
            }
            return null;
          })
        : [];

      if (extraMatches.length === 0) {
        return {
          groupsMap,
          winners,
          extraGroupsMap: null,
          extraWinners: null,
        };
      }

      const extraGroupsMap: Record<string, any[]> = {};

      groups.forEach((group) => {
        extraGroupsMap[group.name] = extraMatches.filter(
          (m) => m.groupId === group.id
        );
      });

      Object.keys(extraGroupsMap).forEach((name) => {
        while (extraGroupsMap[name].length < 4) {
          extraGroupsMap[name].push({
            groupId: null,
            team1: null,
            team2: null,
            winnerId: null,
            isEmpty: true,
          });
        }
      });

      const extraWinners = finalGroup
        ? extraGroupsMap[finalGroup.name].map((m) => {
            if (m.team1 && m.team2 && m.winnerId) {
              return m.team1.id === m.winnerId ? m.team1 : m.team2;
            }
            return null;
          })
        : [];

      return {
        groupsMap,
        winners,
        extraGroupsMap,
        extraWinners,
      };
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
    <>
      <div className={styles.stages}>
        {Object.keys(data.groupsMap).map((group, index) => {
          const style = styles[`matches-${index}`];

          return (
            <div key={group} className={styles.stage}>
              <h5 className={styles.stageTitle}>{group}</h5>

              <div className={`${styles.matches} ${style}`}>
                {data.groupsMap[group].map((match, index) => (
                  <div key={index}>
                    <Match match={match} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

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
            {data.winners.map((winner, index) => (
              <div key={index}>
                <Winner winner={winner} place={2 * index + 1} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.extraGroupsMap && (
        <div className={styles.extraStages}>
          <h3>Матчи за 9–16-е места</h3>

        <div className={styles.stages}>
          {Object.keys(data.extraGroupsMap).map((group, index) => {
            const style = styles[`matches-${index}`];

            return (
              <div key={group} className={styles.stage}>
                <h5 className={styles.stageTitle}>{group}</h5>

                <div className={`${styles.matches} ${style}`}>
                  {data.extraGroupsMap[group].map((match, index) => (
                    <div key={index}>
                      <Match match={match} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className={`${styles.stage} ${styles.playoffStage}`}>
            <h5 className={styles.stageTitle}></h5>
              <div className={styles.winners}>
                {data.winners.map((winner, index) => (
                  <div key={index}>
                    <Winner winner={winner} place={8 + 2 * index + 1} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Bracket;
