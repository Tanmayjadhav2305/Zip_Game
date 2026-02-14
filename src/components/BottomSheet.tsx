import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BottomSheetProps {
    onUndo: () => void;
    onHint: () => void;
    hintCooldown?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ onUndo, onHint, hintCooldown }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full max-w-md px-4 mt-auto mb-4 relative z-40">
            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={onUndo}
                    className="flex-1 bg-white py-3 rounded-xl font-bold text-gray-700 shadow-sm border border-gray-200 active:scale-95 transition-transform"
                >
                    Undo
                </button>
                <button
                    onClick={onHint}
                    disabled={hintCooldown}
                    className={`flex-1 py-3 rounded-xl font-bold shadow-sm border transition-transform ${hintCooldown
                            ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-gray-200 active:scale-95'
                        }`}
                >
                    {hintCooldown ? 'Wait...' : 'Hint'}
                </button>
            </div>

            {/* How to Play Card */}
            <motion.div
                layout
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 overflow-hidden"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex justify-between items-center w-full"
                >
                    <span className="font-bold text-gray-900 text-lg">How to play</span>
                    {isExpanded ? <ChevronDown size={20} className="text-gray-500" /> : <ChevronUp size={20} className="text-gray-500" />}
                </button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pt-4"
                        >
                            <div className="flex gap-4 text-xs font-semibold text-gray-500 items-start">
                                <div className="flex flex-col items-center flex-1 text-center">
                                    <div className="flex gap-1.5 mb-2 bg-gray-50 p-2 rounded-lg">
                                        <div className="w-3 h-3 rounded-full bg-black"></div>
                                        <div className="w-3 h-3 rounded-full bg-black"></div>
                                        <div className="w-3 h-3 rounded-full bg-black"></div>
                                    </div>
                                    <span>Connect the dots in order</span>
                                </div>
                                <div className="flex flex-col items-center flex-1 text-center">
                                    <div className="w-10 h-10 rounded-lg border-2 border-orange-500 flex items-center justify-center mb-2 bg-gray-50">
                                        <div className="w-full h-3 bg-orange-500 mx-1 rounded-sm"></div>
                                    </div>
                                    <span>Fill every cell</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
