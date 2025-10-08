/* eslint-disable @typescript-eslint/no-explicit-any */
import env from '@/src/env';
import useSWR from 'swr';
import styles from './styles.module.css';
import { GetCategoryStatisticsResponse } from '@/src/types';
import Match from './Match';
import Winner from './Winner';
import Image from 'next/image';
import playoff from '@/src/assets/images/playoff.webp';

const payoffMap = {
  [2]: {
    type: 'small',
    countMatchesInGroup: 3,
  },
  [3]: {
    type: 'big',
    countMatchesInGroup: 4,
  },
};

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data: GetCategoryStatisticsResponse) => {
      const matches = data.matches || [];

      const groups = data.groups || [];

      const countOfGroups = groups.length;

      const playOff = payoffMap[countOfGroups as keyof typeof payoffMap];

      if (!playOff) {
        return null;
      }

      const mainMatches = matches.filter((m) => m.type === null);

      const extraMatches = matches.filter((m) => m.type === 'extra');

      const groupsMap: Record<string, any[]> = {};

      groups.forEach((group) => {
        groupsMap[group.name] = mainMatches.filter(
          (m) => m.groupId === group.id
        );
      });

      Object.keys(groupsMap).forEach((name, index, array) => {
        const isLastGroup = index === array.length - 1;

        const countEmpty = playOff.type === 'small' && isLastGroup
          ? playOff.countMatchesInGroup - 1
          : playOff.countMatchesInGroup;

        while (groupsMap[name].length < countEmpty) {
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
      const grandFinalGroup = groups[groups.length - 2];

      let winners = [];

      switch (playOff.type) {
        case 'big':
          winners = grandFinalGroup
            ? groupsMap[grandFinalGroup.name].map((m) => {
              if (m.team1 && m.team2 && m.winnerId) {
                return m.team1.id === m.winnerId ? m.team1 : m.team2;
              }
              return null;
            })
            : [];
          break;
        case 'small':
          const lastGrandFinalMatch =
            groupsMap[grandFinalGroup.name][
            groupsMap[grandFinalGroup.name].length - 1
            ];
          const lastMatches = [
            ...groupsMap[finalGroup.name],
            lastGrandFinalMatch,
          ];

          winners = finalGroup
            ? lastMatches.map((m) => {
              if (m.team1 && m.team2 && m.winnerId) {
                return m.team1.id === m.winnerId ? m.team1 : m.team2;
              }
              return null;
            })
            : [];
          break;
      }

      if (extraMatches.length === 0) {
        return {
          groupsMap,
          winners,
          extraGroupsMap: null,
          extraWinners: null,
          type: playOff.type,
          isExtraGrandFinalEmpty: true,
        };
      }

      const extraGroupsMap: Record<string, any[]> = {};

      groups.forEach((group) => {
        extraGroupsMap[group.name] = extraMatches.filter(
          (m) => m.groupId === group.id
        );
      });

      const isExtraGrandFinalEmpty = extraGroupsMap[grandFinalGroup.name].length === 0;

      Object.keys(extraGroupsMap).forEach((name, index, array) => {
        const isLastGroup = index === array.length - 1;

        const countEmpty = playOff.type === 'small'
          && isLastGroup
          && !isExtraGrandFinalEmpty
          ? playOff.countMatchesInGroup - 1
          : playOff.countMatchesInGroup;

        while (extraGroupsMap[name].length < countEmpty) {
          extraGroupsMap[name].push({
            groupId: null,
            team1: null,
            team2: null,
            winnerId: null,
            isEmpty: true,
          });
        }
      });

      if (isExtraGrandFinalEmpty && playOff.type === 'small') {
        delete extraGroupsMap[grandFinalGroup.name];
      }

      let extraWinners = [];

      switch (playOff.type) {
        case 'big':
          extraWinners = finalGroup
            ? extraGroupsMap[finalGroup.name].map((m) => {
              if (m.team1 && m.team2 && m.winnerId) {
                return m.team1.id === m.winnerId ? m.team1 : m.team2;
              }
              return null;
            })
            : [];
          break;
        case 'small':
          let lastMatches = [];

          if (isExtraGrandFinalEmpty) {
            lastMatches = extraGroupsMap[finalGroup.name];
          } else {
            const lastGrandFinalMatch =
              extraGroupsMap[grandFinalGroup.name][
              extraGroupsMap[grandFinalGroup.name].length - 1
              ];

            lastMatches = [
              ...extraGroupsMap[finalGroup.name],
              lastGrandFinalMatch,
            ];
          }

          extraWinners = finalGroup
            ? lastMatches.map((m) => {
              if (m.team1 && m.team2 && m.winnerId) {
                return m.team1.id === m.winnerId ? m.team1 : m.team2;
              }
              return null;
            })
            : [];
          break;
      }

      return {
        groupsMap,
        winners,
        extraGroupsMap,
        extraWinners,
        type: playOff.type,
        isExtraGrandFinalEmpty,
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

  if (data.type === 'small') {
    return (
      <>
        <div className={styles.stages}>
          {Object.keys(data.groupsMap).map((group, index) => {
            const style = styles[`small-matches-${index}`];

            return (
              <div key={group} className={styles.smallStage}>
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

          <div className={`${styles.smallStage} ${styles.playoffStage}`}>
            <h5 className={styles.stageTitle}></h5>

            <div className={styles.smallWinners}>
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
            <h3>Матчи за 7–12-е места</h3>

            {data.isExtraGrandFinalEmpty
              ? <div className={styles.stages}>
                {Object.keys(data.extraGroupsMap).map((group, index) => {
                  const style = styles[`final-matches-${index}`];

                  return (
                    <div key={group} className={styles.finalStage}>
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

                <div className={`${styles.finalStage} ${styles.playoffStage}`}>
                  <h5 className={styles.stageTitle}></h5>

                  <div className={styles.finalWinners}>
                    {data.extraWinners.map((winner, index) => (
                      <div key={index}>
                        <Winner
                          winner={winner}
                          place={6 + 2 * index + 1}
                          type="extra-small"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              : <div className={styles.stages}>
                {Object.keys(data.extraGroupsMap).map((group, index) => {
                  const style = styles[`small-matches-${index}`];

                  return (
                    <div key={group} className={styles.smallStage}>
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

                <div className={`${styles.smallStage} ${styles.playoffStage}`}>
                  <h5 className={styles.stageTitle}></h5>

                  <div className={styles.smallWinners}>
                    {data.extraWinners.map((winner, index) => (
                      <div key={index}>
                        <Winner
                          winner={winner}
                          place={6 + 2 * index + 1}
                          type="extra-small"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>}
          </div>
        )}
      </>
    );
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
