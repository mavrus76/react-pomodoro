import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IPagesState {
  selectedHome: boolean
}

const initialState: IPagesState = {
  selectedHome: true,
}

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setSelectedHome: (state, action: PayloadAction<boolean>) => {
      state.selectedHome = action.payload
    },
  },
})

export const { setSelectedHome } = pagesSlice.actions
export default pagesSlice.reducer
