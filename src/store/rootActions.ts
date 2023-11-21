import { ActionCreatorsMapObject } from "@reduxjs/toolkit"
import * as actionsTasks from "./tasks/tasksSlice"
import * as actionsTimer from "./timers/timerSlice"
import * as actionsPages from "./pages/pagesSlice"
import * as actionsStats from "./stats/statsSlice"
import * as actionsMode from "./mode/modeSlice"

export const rootActions: ActionCreatorsMapObject = {
  ...actionsTasks,
  ...actionsTimer,
  ...actionsPages,
  ...actionsStats,
  ...actionsMode,
}
