import { useAppSelector } from "../store/hooks"
import { IHoverRange } from "../store/stats/statsSlice"
import { ITask } from "../store/tasks/tasksSlice"
import { ITimer } from "../store/timers/timerSlice"

export const useConstants = () => {
  const selectedHome = useAppSelector((state) => state.root.pages.selectedHome)
  const dark = useAppSelector((state) => state.root.mode.dark)
  const tasksState = useAppSelector<ITask[]>((state) => state.root.tasks.tasks)
  const currentTask = useAppSelector<ITask | null>(
    (state) => state.root.tasks.currentTask,
  )

  const initialTimer: ITimer = {
    id: "",
    timePause: 0,
  }
  const initialEditedTask = {
    id: "",
    title: "",
    timePomodoro: 0,
    qtyPomodoro: 0,
    timeBreak: 0,
    timeBigBreak: 0,
  }

  const timers = useAppSelector<ITimer[]>((state) => state.root.timers.timers)
  const runningTimer = useAppSelector<boolean>(
    (state) => state.root.timers.runningTimer,
  )
  const currentTimer = useAppSelector<ITimer | null>(
    (state) => state.root.timers.currentTimer,
  )

  const selectedWeek = useAppSelector<number>(
    (state) => state.root.stats.selectedWeek,
  )
  const selectedDates = useAppSelector<Date[]>(
    (state) => state.root.stats.selectedDates,
  )
  const hoverRange = useAppSelector<IHoverRange | undefined>(
    (state) => state.root.stats.hoverRange,
  )

  const formatDuration = (durationInSeconds: number): string => {
    const seconds = Math.floor(durationInSeconds % 60)
    const minutes = Math.floor((durationInSeconds / 60) % 60)
    const hours = Math.floor(durationInSeconds / 3600)

    const formatNumber = (num: number): string =>
      num < 10 ? `0${num}` : `${num}`

    if (hours > 0) {
      return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
        seconds,
      )}`
    } else if (minutes > 0) {
      return `${formatNumber(minutes)}:${formatNumber(seconds)}`
    } else {
      return `00:${formatNumber(seconds)}`
    }
  }

  const toSeconds = (timeInMinutes: number | null): number | null => {
    if (timeInMinutes === null) {
      return null
    }
    return timeInMinutes * 60
  }

  return {
    tasksState,
    tasks: tasksState.slice(1),
    timers,
    currentTask,
    initialTimer,
    runningTimer,
    initialEditedTask,
    selectedWeek,
    selectedDates,
    hoverRange,
    formatDuration,
    toSeconds,
    currentTimer,
    selectedHome,
    dark,
  }
}
