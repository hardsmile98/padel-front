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
        return { groupsMap: {}, winners: [], isEmpty: true };
      }

      const groupsMap: Record<string, any[]> = {};

      groups.forEach((group) => {
        groupsMap[group.name] = matches.filter((m) => m.groupId === group.id);
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

      return { groupsMap, winners, isEmpty: false };
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

  if (!data || data.isEmpty) {
    return <div className={styles.error}>Нет данных</div>;
  }

  return (
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
  );
}

export default Bracket;
