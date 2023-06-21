import { TOptions, segNames } from './model';
import { clampToLength, emptyDisplays } from './utils';
import { stringToDisplay } from './view';

export function marquee(
    input: string,
    displayAmount: number = input.length,
    options?: TOptions
): segNames[][][] {
    const frames: segNames[][][] = [];
    for (let i = displayAmount - 1; i >= Math.min(0, displayAmount - input.length); i -= 1) {
        const leftPad = Math.max(0, i);
        const inputStart = Math.max(0, -i);
        const visibleLength = displayAmount - leftPad;
        const visiblePart = input.slice(inputStart, inputStart + visibleLength);
        const rightPad = Math.max(0, displayAmount - leftPad - visiblePart.length);
        frames.push([...emptyDisplays(leftPad), ...stringToDisplay(visiblePart, options), ...emptyDisplays(rightPad)]);
    }
    return frames;
}

export function blink(
    input: string,
    counts = 10,
    options?: TOptions
): segNames[][][] {
    const frames: segNames[][][] = [];
    const empty: segNames[][] = emptyDisplays(input.length);
    const text: segNames[][] = stringToDisplay(input, options);
    for (let i = 0; i < counts; i++) {
        frames.push(i % 2 ? text : empty);
    }
    return frames;
}

export function typing(
    input: string,
    options?: TOptions
): segNames[][][] {
    const frames: segNames[][][] = [];
    const text: segNames[][] = stringToDisplay(input, options);
    for (let i = 0; i < input.length; i++) {
        frames.push(clampToLength(text.slice(0, i + 1), input.length));
    }
    return frames;
}
