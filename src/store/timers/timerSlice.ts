import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ITimer {
  id: string
  timePause: number
}

export interface ITimerState {
  runningTimer: boolean
  currentTimer: ITimer | null
  timers: ITimer[]
}

const initialState: ITimerState = {
  runningTimer: false,
  currentTimer: null,
  timers: [],
}

const timerSlice = createSlice({
  name: "timers",
  initialState,
  reducers: {
    setRunningTimer: (state, action: PayloadAction<boolean>) => {
      state.runningTimer = action.payload
    },
    addTimer: (state, action: PayloadAction<ITimer>) => {
      const index = state.timers.findIndex(
        (timer) => timer.id === action.payload.id,
      )
      if (index === -1) {
        state.timers.push(action.payload)
      }
    },

    deleteTimer: (state, action: PayloadAction<string>) => {
      const index = state.timers.findIndex(
        (timer) => timer.id === action.payload,
      )
      if (index !== -1) {
        state.timers.splice(index, 1)
      }
    },
    setTimePause: (state, action: PayloadAction<number>) => {
      const index = state.timers.findIndex(
        (timer) => timer.id === state.currentTimer?.id,
      )
      if (index !== -1) {
        state.timers[index].timePause = action.payload
      }
    },
    setCurrentTimer: (state, action: PayloadAction<ITimer | null>) => {
      state.currentTimer = action.payload

      const index = state.timers.findIndex((timer) => {
        if (state.currentTimer !== null) {
          return timer.id === state.currentTimer.id
        }
        return null
      })
      if (index !== -1) {
        state.currentTimer = action.payload
      }
    },
  },
})

export const {
  setRunningTimer,
  addTimer,
  deleteTimer,
  setCurrentTimer,
  setTimePause,
} = timerSlice.actions
export default timerSlice.reducer
