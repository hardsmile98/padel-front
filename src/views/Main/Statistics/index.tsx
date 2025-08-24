"use client";

import { GetActiveTournamentResponse } from "@/src/types";
import styles from "./styles.module.css";
import { Container } from "@/src/components";
import Filter from "./Filter";
import { useState } from "react";
import Group from "./Group";

function Statistics({
  tournament,
}: {
  tournament: GetActiveTournamentResponse | null;
}) {
  const [groupId, setGroupId] = useState<number | null>(null);

  return (
    <section className={styles.statistics}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.filter}>
            <Filter tournament={tournament} groupId={groupId} setGroupId={setGroupId} />
          </div>

          {!!groupId && (
            <div className={styles.group}>
              <Group groupId={groupId} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default Statistics;
