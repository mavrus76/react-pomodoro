import { ChangeEvent, FC, useState } from "react"
import styles from "./taskform.module.css"
import { Resolver, useForm } from "react-hook-form"
import { schema } from "../../validate/taskform.validate"
import { yupResolver } from "@hookform/resolvers/yup"
import { nanoid } from "@reduxjs/toolkit"
import { ITask } from "../../store/tasks/tasksSlice"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import classNames from "classnames"
import { useActions } from "../../hooks/useActions"
import { useConstants } from "../../hooks/useConstants"

export const TaskForm: FC = () => {
  const { tasksState, dark } = useConstants()
  const { addTask } = useActions()

  const [title, setTitle] = useState(tasksState[0].title)
  const [timePomodoro, setTimePomodoro] = useState(tasksState[0].timePomodoro)
  const [qtyPomodoro, setQtyPomodoro] = useState(tasksState[0].qtyPomodoro)
  const [timeBreak, setTimeBreak] = useState(tasksState[0].timeBreak)
  const [timeBigBreak, setTimeBigBreak] = useState(tasksState[0].timeBigBreak)

  const [touched, setTouched] = useState(false)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    resolver: yupResolver(schema) as Resolver<ITask>,
  })

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    setTouched(true)
  }

  const handleChangeTimePomodoro = (event: ChangeEvent<HTMLInputElement>) => {
    setTimePomodoro(+event.target.value)
    setTouched(true)
  }

  const handleChangeQtyPomodoro = (event: ChangeEvent<HTMLInputElement>) => {
    setQtyPomodoro(+event.target.value)
    setTouched(true)
  }

  const handleChangeTimeBreak = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeBreak(+event.target.value)
    setTouched(true)
  }

  const handleChangeTimeBigBreak = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeBigBreak(+event.target.value)
    setTouched(true)
  }

  const onSubmit = (data: ITask) => {
    setTouched(false)

    data.id = nanoid()
    data.currentPomodoro = 0
    data.qtyBreaks = 0
    data.qtyBigBreaks = 0
    data.qtyStops = 0
    data.createdAt = Date.now()
    data.updatedAt = Date.now()
    data.done = false
    addTask(data)
    reset()

    setTitle("")
    setTimePomodoro(tasksState[0].timePomodoro)
    setQtyPomodoro(tasksState[0].qtyPomodoro)
    setTimeBreak(tasksState[0].timeBreak)
    setTimeBigBreak(tasksState[0].timeBigBreak)
  }

  return (
    <section className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Создать задачу</legend>

          <label className={styles.label}>
            Задача:
            <input
              className={classNames(styles.input, dark ? styles.dark : "")}
              placeholder="Название задачи"
              type="text"
              value={title}
              aria-invalid={errors.title ? "true" : undefined}
              {...register("title", { onChange: handleChangeTitle })}
            />
            {touched && errors.title && (
              <p className={styles.error}>{errors.title?.message}</p>
            )}
          </label>
          <label className={styles.label}>
            Продолжительность 1-го Pomodoro (мин):
            <input
              className={classNames(styles.input, dark ? styles.dark : "")}
              type="number"
              value={timePomodoro}
              {...register("timePomodoro", {
                onChange: handleChangeTimePomodoro,
              })}
            />
            {touched && errors.timePomodoro && (
              <p className={styles.error}>{errors.timePomodoro?.message}</p>
            )}
          </label>
          <label className={styles.label}>
            Количество Pomodoro:
            <input
              className={classNames(styles.input, dark ? styles.dark : "")}
              type="number"
              value={qtyPomodoro}
              {...register("qtyPomodoro", {
                onChange: handleChangeQtyPomodoro,
              })}
            />
            {touched && errors.qtyPomodoro && (
              <p className={styles.error}>{errors.qtyPomodoro?.message}</p>
            )}
          </label>
          <label className={styles.label}>
            Перерыв (мин):
            <input
              className={classNames(styles.input, dark ? styles.dark : "")}
              type="number"
              value={timeBreak}
              {...register("timeBreak", {
                onChange: handleChangeTimeBreak,
              })}
            />
            {touched && errors.timeBreak && (
              <p className={styles.error}>{errors.timeBreak?.message}</p>
            )}
          </label>
          <label className={styles.label}>
            Большой перерыв (мин):
            <input
              className={classNames(styles.input, dark ? styles.dark : "")}
              type="number"
              value={timeBigBreak}
              {...register("timeBigBreak", {
                onChange: handleChangeTimeBigBreak,
              })}
            />
            {touched && errors.timeBigBreak && (
              <p className={styles.error}>{errors.timeBigBreak?.message}</p>
            )}
          </label>

          <button className={styles.button} type="submit">
            <AddCircleOutlineIcon className={classNames(styles.icon)} />
            Добавить
          </button>
        </fieldset>
      </form>
    </section>
  )
}
