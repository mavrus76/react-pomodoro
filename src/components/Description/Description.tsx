import { FC } from "react"
import styles from "./description.module.css"

export const Description: FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Кратко о технике Pomodoro</h2>
      <p className={styles.text}>
        Техника Помодоро — детище Франческо Чирилло, итальянского студента из
        80-х, который искал способ сконцентрироваться на учёбе, для чего утащил
        с кухни таймер в виде помидорки. Суть техники очень простая:
      </p>
      <ul className={styles.list}>
        <li className={styles.item}>
          Выбрать задачу, над которой хочешь работать.
        </li>
        <li className={styles.item}>Поставить таймер на 25-50 минут.</li>
        <li className={styles.item}>
          Усиленно работать над этой задачей 25-50 минут.
        </li>
        <li className={styles.item}>После — сделать перерыв в 5-10 минут.</li>
        <li className={styles.item}>
          Потом — снова сосредоточенно работать 25-50 минут.
        </li>
        <li className={styles.item}>
          После 4-х «помидорных» циклов — сделать большой перерыв в 15-30 минут.
        </li>
      </ul>
    </section>
  )
}
