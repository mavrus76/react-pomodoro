import React from "react"
import styles from "./todaystats.module.css"
import { useConstants } from "../../hooks/useConstants"
import classNames from "classnames"

export const TodayStats: React.FC = () => {
  const { currentTask, currentTimer } = useConstants()
  const focusUsedTime =
    (currentTask?.timePomodoro ?? 0) * (currentTask?.currentPomodoro ?? 0) +
    (currentTask?.timeBreak ?? 0) * (currentTask?.qtyBreaks ?? 0) +
    (currentTask?.timeBigBreak ?? 0) * (currentTask?.qtyBigBreaks ?? 0)
  const focusUsedPomodoro =
    (currentTask?.timePomodoro ?? 0) * (currentTask?.currentPomodoro ?? 0)

  return (
    <div className={styles.wrapper}>
      <p className={classNames("text-2xl py-2")}>
        Отношение времени работы с таймером ко времени, потраченному на
        законченные «помидорки»:{" "}
        <span className={classNames("text-3xl py-2")}>
          {focusUsedTime} мин / {focusUsedPomodoro} мин
        </span>
      </p>
      <p className={classNames("text-2xl py-2")}>
        Время на паузе:{" "}
        <span className={classNames("text-3xl py-2")}>
          {currentTimer?.timePause ?? 0} сек
        </span>
      </p>
      <p className={classNames("text-2xl py-2")}>
        Количество остановок:{" "}
        <span className={classNames("text-3xl py-2")}>
          {currentTask?.qtyStops ?? 0}
        </span>
      </p>
    </div>
  )
}
