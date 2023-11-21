import { FC, useCallback, useEffect, useRef, useState } from "react"
import styles from "./timer.module.css"
import classNames from "classnames"
import useSound from "use-sound"
import timerStart from "../../assets/sounds/timer-start.mp3"
import timerEnd from "../../assets/sounds/timer-end.mp3"
import timerBreak from "../../assets/sounds/timer-break.mp3"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"
import PauseIcon from "@mui/icons-material/Pause"
import ReplayIcon from "@mui/icons-material/Replay"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import { useActions } from "../../hooks/useActions"
import { useConstants } from "../../hooks/useConstants"
import { useLocation } from "react-router-dom"

export const Timer: FC = () => {
  const { currentTask, formatDuration, toSeconds, currentTimer } =
    useConstants()
  const {
    editTask,
    setRunningTimer,
    setCurrentTask,
    setQtyBreaks,
    setQtyBigBreaks,
    setCurrentPomodoro,
    setQtyStops,
    setTimePause,
  } = useActions()

  const [timer, setTimer] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [isToggle, setIsToggle] = useState(false)
  const [playStart] = useSound(timerStart)
  const [playEnd] = useSound(timerEnd)
  const [playBreak] = useSound(timerBreak)

  const handlePomodoroCompletion = useCallback(() => {
    setIsBreak(!isBreak)
    if (currentTask?.currentPomodoro === currentTask?.qtyPomodoro) {
      editTask({
        ...currentTask,
        done: true,
        updatedAt: Date.now(),
      })
      setRunningTimer(false)
      setCurrentTask(null)
      setIsToggle(true)
      playEnd()
      setIsRunning(false)
      setIsBreak(false)
    } else if (
      (timer === null && !isToggle) ||
      (currentTask?.currentPomodoro! > 0 &&
        currentTask?.currentPomodoro! < (currentTask?.qtyPomodoro ?? 0) &&
        isBreak)
    ) {
      setTimer(toSeconds(currentTask?.timePomodoro ?? 0))
      setCurrentPomodoro(currentTask?.currentPomodoro! + 1)
    } else if (currentTask?.currentPomodoro! % 4 === 0 && !isBreak) {
      setTimer(toSeconds(currentTask?.timeBigBreak ?? 0))
      setQtyBigBreaks(currentTask?.qtyBigBreaks! + 1)
    } else if (currentTask?.currentPomodoro! % 4 !== 0 && !isBreak) {
      setTimer(toSeconds(currentTask?.timeBreak ?? 0))
      setQtyBreaks(currentTask?.qtyBreaks! + 1)
    }
  }, [
    currentTask,
    editTask,
    isBreak,
    isToggle,
    playEnd,
    setCurrentPomodoro,
    setCurrentTask,
    setQtyBigBreaks,
    setQtyBreaks,
    setRunningTimer,
    timer,
    toSeconds,
  ])

  const handleStart = () => {
    if (!currentTask) return null
    if (
      currentTask?.currentPomodoro! > 0 &&
      currentTask?.currentPomodoro! <= currentTask.qtyPomodoro
    ) {
      setIsToggle(false)
      setIsRunning(true)
      setIsPaused(false)
      playStart()
      editTask({
        ...currentTask,
        updatedAt: Date.now(),
      })
      setRunningTimer(true)
    }
  }

  const handleStop = () => {
    if (currentTask) {
      setTimer(toSeconds(currentTask.timePomodoro))
      setCurrentPomodoro(1)
      setQtyStops(currentTask.qtyStops! + 1)
      setIsToggle(true)
      setIsRunning(false)
      setIsPaused(false)
      playEnd()
      editTask({
        ...currentTask,
        updatedAt: Date.now(),
      })
      setRunningTimer(false)
    }
  }

  const handlePause = () => {
    setIsPaused(true)
    playStart()
  }

  const handleReplay = () => {
    setIsPaused(false)
    playStart()
  }

  const handleSkip = () => {
    if (!currentTask) return null
    setIsToggle(false)
    if (
      currentTask?.currentPomodoro! > 0 &&
      currentTask?.currentPomodoro! <= currentTask.qtyPomodoro
    ) {
      handlePomodoroCompletion()
    }
    playStart()
  }

  let location = useLocation()
  let pathname = location.pathname

  useEffect(() => {
    if (pathname === "/") {
      setIsToggle(true)
      setIsRunning(false)
      setIsPaused(false)
      setRunningTimer(false)
    }
  }, [])

  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => (prevTimer ? prevTimer - 1 : 0))
      }, 1000)
    }

    if (timer === 8) {
      playBreak()
    }

    if (timer === 0) {
      clearInterval(intervalRef.current)
      handlePomodoroCompletion()
      playStart()
    }

    if (timer === null && currentTask) {
      setTimer(toSeconds(currentTask?.timePomodoro ?? 0))
      setCurrentPomodoro(1)
      setIsToggle(true)
    } else if (isToggle && currentTask) {
      setTimer(toSeconds(currentTask?.timePomodoro ?? 0))
      setCurrentPomodoro(1)
    } else if (currentTask === null) {
      setTimer(null)
      setCurrentPomodoro(0)
    }

    return () => clearInterval(intervalRef.current)
  }, [
    isRunning,
    isPaused,
    timer,
    handlePomodoroCompletion,
    currentTask,
    isToggle,
    playBreak,
    playEnd,
    playStart,
    toSeconds,
    setCurrentPomodoro,
  ])

  const intervalPauseRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (currentTimer && isPaused) {
      intervalPauseRef.current = setInterval(() => {
        setTimePause(currentTimer.timePause + 1)
      }, 1000)
    } else if (!isPaused) {
      clearInterval(intervalPauseRef.current)
    }

    return () => clearInterval(intervalPauseRef.current)
  }, [currentTimer, isPaused, setTimePause])

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Таймер</h2>
      <div className={classNames("flex flex-col items-center justify-center")}>
        <p className={styles.timer}>{formatDuration(timer ?? 0)}</p>
        <p className={styles.count}>
          Pomodoro:{" "}
          <span className={classNames("text-red-500")}>
            {currentTask?.currentPomodoro ?? 0}
          </span>
        </p>
      </div>
      <div className={styles.buttons}>
        <button
          className={classNames(styles.button, "mr-2")}
          title="Пуск"
          onClick={handleStart}
        >
          <PlayArrowIcon className={styles.icon} />
        </button>
        <button
          className={classNames(styles.button, "mr-2")}
          title="Стоп"
          onClick={handleStop}
        >
          <StopIcon className={styles.icon} />
        </button>
        <button
          className={classNames(styles.button, "mr-2")}
          title="Пауза"
          onClick={handlePause}
        >
          <PauseIcon className={styles.icon} />
        </button>
        <button
          className={classNames(styles.button, "mr-2")}
          title="Продолжить"
          onClick={handleReplay}
        >
          <ReplayIcon className={styles.icon} />
        </button>
        <button
          className={classNames(styles.button)}
          title="Пропустить"
          onClick={handleSkip}
        >
          <SkipNextIcon className={styles.icon} />
        </button>
      </div>
    </section>
  )
}
