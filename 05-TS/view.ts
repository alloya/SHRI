import { TOptions, segNames, segmentCodes } from './model';

export function isKnownChar(char: string): boolean {
    return char in segmentCodes;
}
export function charToDisplay(char: string, options?: TOptions): segNames[] {
    console.log(options);
    if (options?.convertToUpperCase) {
        char = char.toUpperCase();
        console.log(char);
    }
    console.log({ char });
    if (!isKnownChar(char)) {
        if (options?.unknownChar === 'exception') {
            throw new Error(`Cannot convert character ${char} to 14-segment display`);
        }
        return options?.unknownChar ?? [];
    }
    return segmentCodes[char];
}
export function stringToDisplay(input: string, options?: TOptions): segNames[][] {
    return [...input].map(c => charToDisplay(c, options));
}
