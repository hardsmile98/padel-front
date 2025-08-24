import { Loader } from "@/src/components";
import env from "@/src/env";
import useSWR from "swr";
import styles from "./styles.module.css";
import { GetGroupStatisticsResponse } from "@/src/types";
import Matches from "./Matches";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function Group({ groupId }: { groupId: number }) {
  const { data, error, isLoading } = useSWR<GetGroupStatisticsResponse>(
    `${env.API_URL}/api/common/tournaments/groups/${groupId}`,
    fetcher
  );

  console.log(data);

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
      <div>
        Турнирная таблица
      </div>

      <div>
        <Matches matches={data?.matches ?? []} />
      </div>
    </div>
  );
}

export default Group;
