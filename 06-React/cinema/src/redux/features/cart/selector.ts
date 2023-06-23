import { RootState } from "@/redux/store";

export const selectCartModule = (state: RootState) => state.cart;

export const selectProductAmount = (state: RootState, id: string) => selectCartModule(state)[id] || 0;