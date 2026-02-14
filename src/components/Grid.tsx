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
    const lastCallTimeRef = useRef<number>(0); // For throttling

    const currentHeadId = path.length > 0 ? path[path.length - 1] : -1;

    // Handle pointer move for mobile drag support - THROTTLED for 120Hz
    const handlePointerMove = (e: React.PointerEvent) => {
        // Throttle to 8ms for 120fps performance (1000ms / 120fps = 8.3ms)
        const now = performance.now();
        if (now - lastCallTimeRef.current < 8) return;
        lastCallTimeRef.current = now;

        if (!gridRef.current) return;

        // Get grid bounds
        const gridRect = gridRef.current.getBoundingClientRect();

        // Calculate pointer position relative to grid
        const x = e.clientX - gridRect.left;
        const y = e.clientY - gridRect.top;

        // Determine which cell (5x5 grid)
        const col = Math.floor((x / gridRect.width) * 5);
        const row = Math.floor((y / gridRect.height) * 5);

        // Validate bounds
        if (col >= 0 && col < 5 && row >= 0 && row < 5) {
            const cellId = row * 5 + col;
            onPointerEnter(cellId);
        }
    };

    return (
        <div
            className="relative w-full aspect-square max-w-md bg-white rounded-[24px] p-2 select-none touch-none shadow-xl ring-1 ring-black/5"
            ref={gridRef}
            style={{
                contain: 'layout style paint', // CSS containment for better performance
            }}
        >
            <div
                className="relative flex flex-wrap w-full h-full content-start"
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                onPointerMove={handlePointerMove}
                style={{
                    touchAction: 'none', // Prevent default touch behaviors
                }}
            >
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
