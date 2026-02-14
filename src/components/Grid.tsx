import React, { useRef } from 'react';
import { Cell as CellType, Level } from '../game/types';
import { Cell } from './Cell';
import { PathLayer } from './PathLayer';

interface GridProps {
    grid: CellType[];
    path: number[];
    level: Level;
    hintCell: number | null;
    onPointerDown: (id: number) => void;
    onPointerEnter: (id: number) => void;
    onPointerUp: () => void;
}

export const Grid: React.FC<GridProps> = ({
    grid,
    path,
    level,
    hintCell,
    onPointerDown,
    onPointerEnter,
    onPointerUp
}) => {
    const gridRef = useRef<HTMLDivElement>(null);

    const currentHeadId = path.length > 0 ? path[path.length - 1] : -1;


    return (
        <div
            className="relative w-full aspect-square max-w-md bg-white rounded-[24px] p-2 select-none touch-none shadow-xl ring-1 ring-black/5"
            ref={gridRef}
        >
            <div className="relative flex flex-wrap w-full h-full content-start" onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>
                <PathLayer path={path} color={level.color} />

                {grid.map((cell) => (
                    <Cell
                        key={cell.id}
                        cell={cell}
                        isActive={path.includes(cell.id)}
                        isHead={currentHeadId === cell.id}
                        isHint={cell.id === hintCell}
                        onPointerDown={() => onPointerDown(cell.id)}
                        onPointerEnter={() => onPointerEnter(cell.id)}
                    />
                ))}
            </div>
        </div>
    );
};
