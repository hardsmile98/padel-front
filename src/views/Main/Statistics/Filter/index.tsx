import { GetActiveTournamentResponse } from "@/src/types";
import styles from "./styles.module.css";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import lock from "@/src/assets/images/lock.svg";
import ball from "@/src/assets/images/ball.svg";

function Filter({
  tournament,
  groupId,
  setGroupId,
}: {
  tournament: GetActiveTournamentResponse | null;
  groupId: number | null;
  setGroupId: (groupId: number | null) => void;
}) {
  const stages = tournament?.stages;

  const activeStage = tournament?.tournament?.currentStageId;

  const activeStageIndex = stages?.findIndex(
    (stage) => stage.id === activeStage
  );

  const activeStageId =
    activeStageIndex !== undefined ? stages?.[activeStageIndex]?.id : null;

  const [form, setForm] = useState<{
    stage: number | null;
    leage: number | null;
    subLeage: number | null;
  }>({
    stage: activeStageId ?? null,
    leage: null,
    subLeage: null,
  });

  const leages = useMemo(() => {
    return tournament?.categories?.filter(
      (category) =>
        category.stageId === form.stage && !category.parentCategoryId
    );
  }, [tournament?.categories, form.stage]);

  const subLeages = useMemo(() => {
    return tournament?.categories?.filter(
      (category) =>
        category.parentCategoryId === form.leage && category.stageId === form.stage
    );
  }, [tournament?.categories, form.leage, form.stage]);

  const groups = useMemo(() => {
    return tournament?.groups?.filter(
      (group) => group.categoryId === form.subLeage || group.categoryId === form.leage
    );
  }, [tournament?.groups, form.subLeage, form.leage]);

  useEffect(() => {
    if (leages) {
      setForm((prev) => ({ ...prev, leage: leages?.[0]?.id ?? null }));
    }
  }, [leages]);

  useEffect(() => {
    if (subLeages) {
      setForm((prev) => ({ ...prev, subLeage: subLeages?.[0]?.id ?? null }));
    }
  }, [subLeages]);

  useEffect(() => {
    if (groups) {
      setGroupId(groups?.[0]?.id ?? null);
    }
  }, [setGroupId, groups]);

  return (
    <div>
      <div className={styles.stages}>
        {stages?.map((stage, index) => (
          <div key={stage.id} className={styles.stage}>
            <div className={styles.stageName}>{index + 1} этап</div>

            <button
              className={form.stage === stage.id ? styles.stageActive : ""}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, stage: stage.id }))}
              disabled={
                activeStageIndex !== undefined
                  ? index > activeStageIndex
                  : false
              }
            >
              {activeStageIndex !== undefined && index > activeStageIndex && (
                <Image src={lock} alt="lock" width={16} height={16} />
              )}

              {stage.name}
            </button>
          </div>
        ))}
      </div>

      {!!leages?.length && (
        <div className={styles.leages}>
          {leages?.map((leage) => (
            <button
              key={leage.id}
              className={form.leage === leage.id ? styles.leageActive : ""}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, leage: leage.id }))}
            >
              {form.leage === leage.id && <Image className={styles.ball} src={ball} alt="ball" width={12} height={12} />}

              {leage.name}
            </button>
          ))}
        </div>
      )}

      {!!subLeages?.length && (
        <div className={styles.subLeages}>
          {subLeages?.map((subLeage) => (
            <button
              key={subLeage.id}
              className={
                form.subLeage === subLeage.id ? styles.subLeageActive : ""
              }
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, subLeage: subLeage.id }))}
            >
              {subLeage.name}
            </button>
          ))}
        </div>
      )}

      {!!groups?.length && (
        <div className={styles.groups}>
          {groups?.map((group) => (
            <button
              key={group.id}
              className={groupId === group.id ? styles.groupActive : ""}
              type="button"
              onClick={() => setGroupId(group.id)}
            >
              {group.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;
