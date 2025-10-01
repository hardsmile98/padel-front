import env from "@/src/env";
import useSWR from "swr";
import styles from "./styles.module.css";

const fetcher = (url: string) =>
    fetch(url)
      .then((r) => r.json())

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

  return <div>Bracket</div>;
}

export default Bracket;
