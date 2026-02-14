import React, { useMemo } from 'react';
import { GRID_SIZE } from '../game/logic';

interface PathLayerProps {
    path: number[];
    color?: { start: string; end: string };
}

export const PathLayer: React.FC<PathLayerProps> = ({ path, color }) => {
    // Default to orange if no color provided
    const pathColor = color || { start: '#ff6b35', end: '#f7931e' };

    // Helper to get coordinates for SVG path
    // Center of cell (row, col) in %
    const getCenter = (index: number) => {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;
        return {
            x: col * 20 + 10,
            y: row * 20 + 10
        };
    };

    // Memoize path string for performance - prevents recalculation on every render
    const pathString = useMemo(() => {
        if (path.length === 0) return '';
        return path.map((cellId, i) => {
            const { x, y } = getCenter(cellId);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    }, [path]);

    // Skip rendering if no path
    if (path.length === 0) return null;

    const gradientId = "path-gradient";

    return (
        <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
                // Force GPU acceleration for smooth 60fps+
                transform: 'translate3d(0, 0, 0)',
                willChange: 'auto', // Let browser optimize
            }}
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={pathColor.start} />
                    <stop offset="100%" stopColor={pathColor.end} />
                </linearGradient>

                {/* Simplified drop shadow - minimal for max performance */}
                <filter id="path-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.08)" />
                </filter>
            </defs>

            {/* Main Path - NO ANIMATION for instant updates */}
            <path
                d={pathString}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth="12%"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#path-shadow)"
                style={{
                    transform: 'translate3d(0, 0, 0)', // GPU layer
                    willChange: 'auto',
                }}
            />

            {/* Highlight - Light reflection for depth - NO ANIMATION */}
            <path
                d={pathString}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="7%"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'auto',
                }}
            />
        </svg>
    );
};
