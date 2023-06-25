import {PayloadAction, createSlice} from "@reduxjs/toolkit";

// Define a type for the slice state
export interface CartState {
  [key: string]: number
};

// Define the initial state using that type
const initialState: CartState = {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, { payload }) => {
      const count = state[payload] || 0;
      if (count >= 30) return;
      state[payload] = count + 1;
    },
    decrement: (state, { payload }) => {
      const count = state[payload];
      if (!state[payload]) return;
      if (count === 1) {
        delete state[payload];
        return;
      }
      state[payload] = count -1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    remove: (state, { payload }) => {
      if (payload in state) {
        delete state[payload]
      }
    },
    reset: () => {
      return initialState;
    }
  }
});
export const { increment, decrement, remove } = cartSlice.actions;

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;