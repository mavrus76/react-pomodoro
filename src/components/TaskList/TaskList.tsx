import { FC, useEffect, useState } from "react"
import classNames from "classnames"
import styles from "./tasklist.module.css"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import SaveIcon from "@mui/icons-material/Save"
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt"
import { Resolver, useForm } from "react-hook-form"
import { schema } from "../../validate/taskform.validate"
import { yupResolver } from "@hookform/resolvers/yup"
import { ITask } from "../../store/tasks/tasksSlice"
import { useActions } from "../../hooks/useActions"
import { useConstants } from "../../hooks/useConstants"

export const TaskList: FC = () => {
  const {
    tasks,
    currentTask,
    runningTimer,
    initialEditedTask,
    timers,
    initialTimer,
    dark,
  } = useConstants()
  const {
    editTask,
    deleteTask,
    setCurrentTask,
    deleteTimer,
    setCurrentTimer,
    addTimer,
  } = useActions()

  const [touched, setTouched] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    resolver: yupResolver(schema) as Resolver<ITask>,
  })

  const [editedTask, setEditedTask] = useState<ITask>(initialEditedTask)

  const handleEdit = (taskId: string) => {
    const taskToEdit = tasks.find((task) => task.id === taskId)
    if (taskToEdit) {
      setEditedTask(taskToEdit)
      setValue("title", taskToEdit?.title)
      setValue("timePomodoro", taskToEdit?.timePomodoro)
      setValue("qtyPomodoro", taskToEdit?.qtyPomodoro)
      setValue("timeBreak", taskToEdit?.timeBreak)
      setValue("timeBigBreak", taskToEdit?.timeBigBreak)
    }
  }

  const handleSave = () => {
    editTask({ ...editedTask, updatedAt: Date.now() })
    setEditedTask(initialEditedTask)
    setTouched(false)
    setCurrentTask(null)
  }

  const handleDelete = (taskId: string) => {
    deleteTask(taskId)
    deleteTimer(taskId)
    setCurrentTask(null)
  }

  const handleCancel = () => {
    setEditedTask(initialEditedTask)
    setTouched(false)
  }

  const handleSetCurrentTask = (task: ITask) => {
    if (task.done || runningTimer) return null
    else {
      setCurrentTask(task)
      addTimer({ ...initialTimer, id: task.id })
    }
  }

  useEffect(() => {
    if (currentTask !== null) {
      const timer = timers.find((timer) => timer.id === currentTask?.id)
      setCurrentTimer(timer)
    }
  }, [currentTask, setCurrentTimer, timers])

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Список задач</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={classNames(styles.task)}>
            {editedTask.id === task.id && task.id !== "" ? (
              <form
                className={classNames(styles.form)}
                onSubmit={handleSubmit(handleSave)}
              >
                <label className="flex flex-col mb-4">
                  <input
                    className={classNames(
                      styles.input,
                      dark ? styles.dark : "",
                    )}
                    type="text"
                    value={editedTask.title}
                    placeholder="Название задачи"
                    aria-invalid={errors.title ? "true" : undefined}
                    {...register("title", {
                      onChange: (e) => {
                        setEditedTask({ ...editedTask, title: e.target.value })
                        setTouched(true)
                      },
                    })}
                  />
                  {touched && errors.title && (
                    <p className={styles.error}>{errors.title?.message}</p>
                  )}
                </label>
                <label className="flex flex-col mb-4">
                  <input
                    className={classNames(
                      styles.input,
                      dark ? styles.dark : "",
                    )}
                    type="number"
                    value={editedTask.timePomodoro}
                    placeholder="Продолжительность помидорки (в минутах)"
                    aria-invalid={errors.timePomodoro ? "true" : undefined}
                    {...register("timePomodoro", {
                      onChange: (e) => {
                        setEditedTask({
                          ...editedTask,
                          timePomodoro: parseInt(e.target.value),
                        })
                        setTouched(true)
                      },
                    })}
                  />
                  {touched && errors.timePomodoro && (
                    <p className={styles.error}>
                      {errors.timePomodoro?.message}
                    </p>
                  )}
                </label>
                <label className="flex flex-col mb-4">
                  <input
                    className={classNames(
                      styles.input,
                      dark ? styles.dark : "",
                    )}
                    type="number"
                    value={editedTask.qtyPomodoro}
                    placeholder="Количество помидорок"
                    aria-invalid={errors.qtyPomodoro ? "true" : undefined}
                    {...register("qtyPomodoro", {
                      onChange: (e) => {
                        setEditedTask({
                          ...editedTask,
                          qtyPomodoro: parseInt(e.target.value),
                        })
                        setTouched(true)
                      },
                    })}
                  />
                  {touched && errors.qtyPomodoro && (
                    <p className={styles.error}>
                      {errors.qtyPomodoro?.message}
                    </p>
                  )}
                </label>
                <label className="flex flex-col mb-4">
                  <input
                    className={classNames(
                      styles.input,
                      dark ? styles.dark : "",
                    )}
                    type="number"
                    value={editedTask.timeBreak}
                    placeholder="Продолжительность перерыва (в минутах)"
                    aria-invalid={errors.timeBreak ? "true" : undefined}
                    {...register("timeBreak", {
                      onChange: (e) => {
                        setEditedTask({
                          ...editedTask,
                          timeBreak: parseInt(e.target.value),
                        })
                        setTouched(true)
                      },
                    })}
                  />
                  {touched && errors.timeBreak && (
                    <p className={styles.error}>{errors.timeBreak?.message}</p>
                  )}
                </label>
                <label className="flex flex-col mb-4">
                  <input
                    className={classNames(
                      styles.input,
                      dark ? styles.dark : "",
                    )}
                    type="number"
                    value={editedTask.timeBigBreak}
                    placeholder="Продолжительность большого перерыва (в минутах)"
                    aria-invalid={errors.timeBigBreak ? "true" : undefined}
                    {...register("timeBigBreak", {
                      onChange: (e) => {
                        setEditedTask({
                          ...editedTask,
                          timeBigBreak: parseInt(e.target.value),
                        })
                        setTouched(true)
                      },
                    })}
                  />
                  {touched && errors.timeBigBreak && (
                    <p className={styles.error}>
                      {errors.timeBigBreak?.message}
                    </p>
                  )}
                </label>

                <button
                  className={classNames(
                    styles.button,
                    styles.button_blue,
                    "mb-2",
                  )}
                  type="submit"
                >
                  <SaveIcon
                    className={classNames(styles.icon, styles.icon_text)}
                  />
                  Сохранить
                </button>
                <button
                  className={classNames(styles.button, styles.button_red)}
                  type="button"
                  onClick={handleCancel}
                >
                  <DoDisturbAltIcon
                    className={classNames(styles.icon, styles.icon_text)}
                  />
                  Отмена
                </button>
              </form>
            ) : (
              <div
                className={classNames(
                  "flex justify-between items-center mb-2 transition-all duration-300 ease-in-out",
                  task.done === true ? styles.done : "",
                )}
              >
                <div className="flex mr-2 items-center">
                  <label className="flex flex-col mr-2 items-center font-medium">
                    Setup:
                    <input
                      name="currentTask"
                      type="radio"
                      checked={
                        task.id === currentTask?.id &&
                        !task.done &&
                        !currentTask?.done
                      }
                      disabled={runningTimer}
                      value={currentTask?.title}
                      onChange={() => handleSetCurrentTask(task)}
                    />
                  </label>
                  <span className="mr-4">{task.title}</span>
                </div>
                <div className="flex flex-wrap justify-end">
                  <button
                    className={classNames(
                      styles.button,
                      styles.button_blue,
                      "my-1",
                    )}
                    type="button"
                    title="Редактировать"
                    onClick={() => handleEdit(task.id ?? "")}
                  >
                    <EditIcon className={classNames(styles.icon)} />
                  </button>
                  <button
                    className={classNames(
                      styles.button,
                      styles.button_red,
                      "ml-2",
                      "my-1",
                    )}
                    type="button"
                    title="Удалить"
                    onClick={() => handleDelete(task.id ?? "")}
                  >
                    <DeleteIcon className={classNames(styles.icon)} />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
