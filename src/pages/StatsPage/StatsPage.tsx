import { FC } from "react"
import styles from "./statspage.module.css"
import classNames from "classnames"
import { TodayStats } from "../../components/TodayStats"
import { BarChart } from "../../components/BarChart"
import { WeekSelector } from "../../components/WeekSelector"

export const StatsPage: FC = () => {
  return (
    <div className={classNames(styles.wrapper)}>
      <WeekSelector />
      <BarChart />
      <TodayStats />
    </div>
  )
}
