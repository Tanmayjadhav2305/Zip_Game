import React from 'react';
import { Cell as CellType } from '../game/types';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface CellProps {
    cell: CellType;
    isActive: boolean;
    isHead: boolean;
    isHint: boolean;
    onPointerDown: () => void;
    onPointerEnter: () => void;
}

// CRITICAL: React.memo prevents unnecessary re-renders for 120Hz smoothness
export const Cell: React.FC<CellProps> = React.memo(({
    cell,
    isActive,
    isHead,
    isHint,
    onPointerDown,
    onPointerEnter
}) => {
    return (
        <div className="w-[20%] h-[20%] p-1 relative">

            <div
                className={twMerge(
                    "absolute inset-0 rounded-[12px] transition-colors duration-200",
                    "bg-[#fcfcfc] border border-gray-100 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.02)]",
                )}
                style={{
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03), 0 1px 1px rgba(0,0,0,0.05)",
                    // GPU acceleration
                    transform: 'translate3d(0, 0, 0)',
                    willChange: isActive ? 'background-color, transform' : 'auto',
                }}
                onPointerDown={onPointerDown}
                onPointerEnter={onPointerEnter}
            >
                {/* Active state background - INSTANT transition for buttery smooth backtrack */}
                {isActive && (
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.1, // Very fast for instant feedback
                            ease: "easeOut"
                        }}
                        className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-300"
                        style={{
                            transform: 'translate3d(0, 0, 0)',
                        }}
                    />
                )}

                {/* Head indicator - pulsing animation for current position */}
                {isHead && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 800, // Very snappy
                            damping: 20,
                            mass: 0.1
                        }}
                        className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-orange-400 to-orange-500 ring-2 ring-orange-600 ring-offset-1"
                        style={{
                            transform: 'translate3d(0, 0, 0)',
                        }}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 rounded-[12px] bg-orange-400"
                        />
                    </motion.div>
                )}

                {/* Hint indicator - pulsing blue ring */}
                {isHint && (
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 0.3, 0.6]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 rounded-[12px] ring-4 ring-blue-400 ring-offset-2 pointer-events-none"
                        style={{
                            transform: 'translate3d(0, 0, 0)',
                        }}
                    />
                )}

                {/* Number display - always on top */}
                {cell.isFixed && (
                    <div className="relative flex items-center justify-center h-full z-10">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 600,
                                damping: 25
                            }}
                            className={twMerge(
                                "font-black text-2xl rounded-full w-10 h-10 flex items-center justify-center shadow-sm",
                                isActive || isHead
                                    ? "bg-white text-orange-600"
                                    : "bg-gray-800 text-white"
                            )}
                            style={{
                                transform: 'translate3d(0, 0, 0)',
                            }}
                        >
                            {cell.value}
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison function - only re-render if these specific props changed
    return (
        prevProps.isActive === nextProps.isActive &&
        prevProps.isHead === nextProps.isHead &&
        prevProps.isHint === nextProps.isHint &&
        prevProps.cell.id === nextProps.cell.id &&
        prevProps.cell.value === nextProps.cell.value
    );
});

Cell.displayName = 'Cell';
