import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IStatsState {
  selectedWeek: number
  hoverRange: IHoverRange | undefined
  selectedDates: Date[]
}

export interface IHoverRange {
  from: Date
  to: Date
}

const initialState: IStatsState = {
  selectedWeek: 1,
  hoverRange: undefined,
  selectedDates: [],
}

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setSelectedWeek: (state, action: PayloadAction<number>) => {
      state.selectedWeek = action.payload
    },
    setSelectedDates: (state, action: PayloadAction<Date[]>) => {
      state.selectedDates = []
      state.selectedDates.push(...action.payload)
    },
    setHoverRange: (state, action: PayloadAction<IHoverRange | undefined>) => {
      state.hoverRange = action.payload
    },
  },
})

export const { setSelectedWeek, setSelectedDates, setHoverRange } =
  statsSlice.actions
export default statsSlice.reducer
