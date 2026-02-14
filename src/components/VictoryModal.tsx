import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';

interface VictoryModalProps {
    timer: string;
    levelNumber: number;
    streak: number;
    score: number;
    onPlayAgain: () => void;
    onShare: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
    timer,
    levelNumber,
    streak,
    score,
    onPlayAgain,
    onShare
}) => {
    // Check for streak milestones
    const isMilestone = streak > 0 && streak % 10 === 0;
    const badge = streak >= 30 ? '🏆' : streak >= 20 ? '💎' : streak >= 10 ? '⭐' : '🎯';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container - COMPACT, NO SCROLL NEEDED */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
                className="bg-white relative w-full max-w-sm mx-4 rounded-3xl shadow-2xl overflow-hidden"
                style={{
                    transform: 'translate3d(0, 0, 0)',
                }}
            >
                {/* Header - Compact */}
                <div className="bg-gradient-to-br from-[#ff6b35] to-[#f7931e] px-6 py-8 text-center text-white relative">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]" />

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1, stiffness: 200 }}
                        className="text-5xl mb-2 relative z-10"
                    >
                        {isMilestone ? '🎉' : '🏁'}
                    </motion.div>

                    <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1 relative z-10">
                        Level {levelNumber}
                    </div>
                    <h2 className="text-2xl font-bold mb-3 relative z-10">
                        Victory!
                    </h2>

                    {/* Time + Score inline */}
                    <div className="flex items-center justify-center gap-3 relative z-10">
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2">
                            <div className="text-2xl font-black">{timer}</div>
                        </div>
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2">
                            <div className="text-xs opacity-80">SCORE</div>
                            <div className="text-lg font-bold">+{score}</div>
                        </div>
                    </div>
                </div>

                {/* Content - Super Compact */}
                <div className="p-5">
                    {/* Streak Badge - Prominent but compact */}
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-50 px-4 py-2 rounded-xl">
                            <span className="text-2xl">{badge}</span>
                            <div>
                                <div className="text-[10px] text-gray-600 font-medium">STREAK</div>
                                <div className="text-xl font-black text-orange-600">{streak}</div>
                            </div>
                        </div>
                    </div>

                    {/* Mini Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                        <div className="bg-gray-50 rounded-lg p-2">
                            <div className="font-bold text-lg text-gray-900">{levelNumber}</div>
                            <div className="text-[9px] text-gray-500 font-bold uppercase">Level</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                            <div className="font-bold text-lg text-gray-900">{streak}</div>
                            <div className="text-[9px] text-gray-500 font-bold uppercase">Streak</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                            <div className="font-bold text-lg text-gray-900">{Math.floor(score / 100)}</div>
                            <div className="text-[9px] text-gray-500 font-bold uppercase">Score×100</div>
                        </div>
                    </div>

                    {/* Badges - Inline, minimal */}
                    {streak >= 10 && (
                        <div className="flex justify-center gap-2 mb-4 text-2xl">
                            <div className={streak >= 10 ? 'opacity-100' : 'opacity-30'}>⭐</div>
                            <div className={streak >= 20 ? 'opacity-100' : 'opacity-30'}>💎</div>
                            <div className={streak >= 30 ? 'opacity-100' : 'opacity-30'}>🏆</div>
                        </div>
                    )}

                    {/* Buttons */}
                    <button
                        onClick={onPlayAgain}
                        className="w-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white py-3.5 rounded-full font-bold text-base shadow-lg hover:shadow-xl active:scale-95 transition-all mb-2"
                    >
                        Next Level →
                    </button>
                    <button
                        onClick={onShare}
                        className="w-full text-gray-500 py-2 text-sm font-medium hover:text-gray-900 flex items-center justify-center gap-2 transition-colors"
                    >
                        <Share2 size={14} />
                        Share
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
