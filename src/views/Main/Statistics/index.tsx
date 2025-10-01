'use client';

import { GetActiveTournamentResponse } from '@/src/types';
import styles from './styles.module.css';
import { Container } from '@/src/components';
import Filter from './Filter';
import Image from 'next/image';
import logo from '@/src/assets/images/logo.svg';
import { useState } from 'react';
import Group from './Group';
import Bracket from './Bracket';

function Statistics({
  tournament,
}: {
  tournament: GetActiveTournamentResponse | null;
}) {
  const [groupId, setGroupId] = useState<number | null>(null);

  const [isFinalStage, setIsFinalStage] = useState<boolean>(false);

  const [categoryId, setCategoryId] = useState<number | null>(null);

  return (
    <section className={styles.statistics}>
      <Container>
        <div>
          <div className={styles.logo}>
            <Image width={147} height={14} src={logo} alt="GoPadel League" />
          </div>

          <div className={styles.description}>
              <h1>Статистика игр</h1>

              <p>
                Выберите нужную группу{" "}
                <span>, чтобы выбрать, нажмите на таб ниже</span>
              </p>
            </div>

          <div className={styles.filter}>
            <Filter
              tournament={tournament}
              groupId={groupId}
              setGroupId={setGroupId}
              setIsFinalStage={setIsFinalStage}
              setCategoryId={setCategoryId}
            />
          </div>

          {!isFinalStage && !!groupId && (
            <div className={styles.group}>
              <Group groupId={groupId} />
            </div>
          )}

          {isFinalStage && !!categoryId && (
            <div className={styles.group}>
              <Bracket categoryId={categoryId} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default Statistics;
