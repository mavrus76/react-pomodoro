import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ITask {
  id?: string
  title: string
  timePomodoro: number
  qtyPomodoro: number
  timeBreak: number
  timeBigBreak: number
  currentPomodoro?: number
  qtyBreaks?: number
  qtyBigBreaks?: number
  qtyStops?: number
  createdAt?: number
  updatedAt?: number
  done?: boolean
}

export interface ITasksState {
  tasks: ITask[]
  currentTask: ITask | null
  status: "idle" | "loading" | "failed"
}

const initialState: ITasksState = {
  tasks: [
    {
      title: "",
      timePomodoro: 25,
      qtyPomodoro: 5,
      timeBreak: 5,
      timeBigBreak: 15,
    },
  ],
  currentTask: null,
  status: "idle",
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload)
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      )
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload)
      if (index !== -1) {
        state.tasks.splice(index, 1)
      }
    },
    setCurrentTask: (state, action: PayloadAction<ITask | null>) => {
      state.currentTask = action.payload

      const index = state.tasks.findIndex((task) => {
        if (state.currentTask !== null) {
          return task.id === state.currentTask.id
        }
        return null
      })
      if (index !== -1) {
        state.tasks.splice(index, 1)
      }

      if (state.currentTask !== null) {
        state.tasks.splice(1, 0, state.currentTask)
      }
    },
    setCurrentPomodoro: (state, action: PayloadAction<number>) => {
      if (state.currentTask) {
        state.currentTask.currentPomodoro = action.payload
      }
    },
    setQtyBreaks: (state, action: PayloadAction<number>) => {
      if (state.currentTask) {
        state.currentTask.qtyBreaks = action.payload
      }
    },
    setQtyBigBreaks: (state, action: PayloadAction<number>) => {
      if (state.currentTask) {
        state.currentTask.qtyBigBreaks = action.payload
      }
    },
    setQtyStops: (state, action: PayloadAction<number>) => {
      if (state.currentTask) {
        state.currentTask.qtyStops = action.payload
      }
    },
  },
})

export const {
  addTask,
  editTask,
  deleteTask,
  setCurrentTask,
  setQtyBreaks,
  setQtyBigBreaks,
  setCurrentPomodoro,
  setQtyStops,
} = tasksSlice.actions
export default tasksSlice.reducer
