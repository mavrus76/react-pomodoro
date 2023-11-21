import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IModeState {
  dark: boolean
}

const initialState: IModeState = {
  dark: false,
}

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setModeDark: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload
    },
  },
})

export const { setModeDark } = modeSlice.actions
export default modeSlice.reducer
