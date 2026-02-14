export interface Cell {
    id: number; // 0 to 24
    row: number;
    col: number;
    value: number | null;
    isFixed: boolean; // True if part of the initial puzzle
}

export interface Level {
    id: number;
    initialValues: Record<number, number>; // Map index -> value
    solutionPath: number[];
    color: { start: string; end: string };
}

export interface GameState {
    grid: Cell[];
    path: number[];
    isWon: boolean;
    isDragging: boolean;
}
