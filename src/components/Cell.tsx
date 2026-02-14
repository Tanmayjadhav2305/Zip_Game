import React from 'react';
import { motion } from 'framer-motion';
import { Cell as CellType } from '../game/types';
import { twMerge } from 'tailwind-merge';

interface CellProps {
    cell: CellType;
    isActive: boolean;
    isHead: boolean;
    isHint?: boolean;
    onPointerDown: () => void;
    onPointerEnter: () => void;
}

export const Cell: React.FC<CellProps> = ({
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
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03), 0 1px 1px rgba(0,0,0,0.05)"
                }}
                onPointerDown={onPointerDown}
                onPointerEnter={onPointerEnter}
            >
            </div>

            {/* Number Display (if any) */}
            {cell.value !== null && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <motion.div
                        initial={false}
                        animate={{
                            scale: isActive ? 1.1 : 1,
                            backgroundColor: "#1e1e1e", // Zip Dark
                        }}
                        className={twMerge(
                            "w-8 h-8 rounded-full flex items-center justify-center text-[15px] font-bold shadow-sm",
                            "text-white"
                        )}
                    >
                        {cell.value}
                    </motion.div>
                </div>
            )}

            {/* Drag Head Highlight (Ghost) */}
            {cell.value === null && isHead && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <motion.div
                        layoutId="drag-head"
                        className="w-8 h-8 rounded-full bg-orange-500 opacity-30"
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                        }}
                    />
                </div>
            )}

            {/* Hint Pulse Animation */}
            {isHint && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    <motion.div
                        className="absolute w-full h-full rounded-[8px] border-4 border-blue-500"
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                    />
                    <div className="w-10 h-10 rounded-full bg-blue-500/30" />
                </div>
            )}
        </div>
    );
};
