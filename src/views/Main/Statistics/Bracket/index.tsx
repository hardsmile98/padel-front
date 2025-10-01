import env from "@/src/env";
import useSWR from "swr";
import styles from "./styles.module.css";
import { GetCategoryStatisticsResponse } from "@/src/types";

const fetcher = (url: string) =>
    fetch(url)
      .then((r) => r.json())
      .then((data: GetCategoryStatisticsResponse) => {
        return {
          bracket: [],
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

  if (!data?.bracket.length) {
    return <div className={styles.error}>Нет данных для отображения</div>;
  }

  return (
    <div>
      11232
    </div>
  );
}

export default Bracket;
