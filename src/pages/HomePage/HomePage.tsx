import { FC } from "react"
import styles from "./homepage.module.css"
import { TaskForm } from "../../components/TaskForm"
import { TaskList } from "../../components/TaskList"
import { Description } from "../../components/Description"
import { Timer } from "../../components/Timer"
import classNames from "classnames"

export const HomePage: FC = () => {
  return (
    <div className={classNames(styles.wrapper)}>
      <Description />
      <TaskForm />
      <TaskList />
      <Timer />
    </div>
  )
}
