import { segNames } from "./model";

export function clampToLength(state: segNames[][], length: number): segNames[][] {
  return state
    .concat(emptyDisplays(Math.max(0, length - state.length)))
    .slice(0, length);
}

export function emptyDisplays(amount: number): segNames[][] {
  return Array.from({ length: amount }, () => []);
}
