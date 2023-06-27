import { ICinema } from "@/models/cinema.model";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ICinema[] = [];

export const cinemasSlice = createSlice({
  name: 'cinemas',
  initialState,
  reducers: {
    setCinemasStore: (state, { payload }: { payload: ICinema[] }) => {
      return [...state, ...payload];
    }
  }
})

export default cinemasSlice.reducer;
export const { setCinemasStore } = cinemasSlice.actions;