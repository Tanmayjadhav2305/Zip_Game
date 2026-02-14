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

            {/* Modal Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
                className="bg-white relative w-full max-w-sm mx-4 rounded-[32px] shadow-2xl"
                style={{
                    maxHeight: 'calc(100svh - 60px)',
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch', // Smooth iOS scrolling
                    transform: 'translate3d(0, 0, 0)', // GPU acceleration
                }}
            >
                {/* Header Content */}
                <div className="bg-gradient-to-br from-[#ff6b35] to-[#f7931e] p-8 text-center text-white relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-10">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -50, 0],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                        className="text-7xl mb-3"
                    >
                        {isMilestone ? '🎉' : '🏁'}
                    </motion.div>

                    {isMilestone && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-2"
                        >
                            <div className="text-lg font-black uppercase tracking-widest bg-white/20 backdrop-blur-md rounded-full px-4 py-1 inline-block">
                                {badge} {streak} STREAK MILESTONE! {badge}
                            </div>
                            <div className="text-sm mt-2 font-bold opacity-90">
                                Congratulations! You're on fire! 🔥
                            </div>
                        </motion.div>
                    )}

                    <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-1">
                        Level {levelNumber}
                    </div>
                    <h2 className="text-3xl font-bold mb-6">
                        {isMilestone ? 'Epic Victory!' : 'Victory!'}
                    </h2>

                    {/* Score Card */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-block min-w-[140px]">
                        <div className="text-4xl font-black">{timer}</div>
                        <div className="text-xs font-semibold opacity-80 mt-1">
                            +{score.toLocaleString()} points
                        </div>
                    </div>
                </div>

                {/* Stats Content */}
                <div className="p-6">
                    {/* Streak Badge Display */}
                    <div className="flex justify-center gap-2 mb-6">
                        <motion.div
                            className="flex items-center gap-3 bg-gradient-to-r from-orange-100 to-orange-50 px-5 py-3 rounded-2xl"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-3xl">{badge}</span>
                            <div>
                                <div className="text-sm text-gray-600 font-medium">Current Streak</div>
                                <div className="text-2xl font-black text-orange-600">{streak}</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                        <div className="bg-gray-50 rounded-xl p-3">
                            <div className="font-bold text-2xl text-gray-900">{levelNumber}</div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase">Level</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                            <div className="font-bold text-2xl text-gray-900">{streak}</div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase">Streak</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                            <div className="font-bold text-2xl text-gray-900">{Math.floor(score / 100)}</div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase">Score</div>
                        </div>
                    </div>

                    {/* Badge Collection */}
                    <div className="mb-6 bg-gray-50 rounded-2xl p-4">
                        <div className="text-xs font-bold text-gray-600 uppercase mb-3 text-center">
                            Your Badges
                        </div>
                        <div className="flex justify-center gap-3">
                            <div className={`text-3xl transition-all ${streak >= 10 ? 'scale-100 opacity-100' : 'scale-75 opacity-30 grayscale'}`}>
                                ⭐
                            </div>
                            <div className={`text-3xl transition-all ${streak >= 20 ? 'scale-100 opacity-100' : 'scale-75 opacity-30 grayscale'}`}>
                                💎
                            </div>
                            <div className={`text-3xl transition-all ${streak >= 30 ? 'scale-100 opacity-100' : 'scale-75 opacity-30 grayscale'}`}>
                                🏆
                            </div>
                        </div>
                        <div className="text-xs text-center text-gray-500 mt-2">
                            {streak < 10 && `${10 - streak} more for ⭐`}
                            {streak >= 10 && streak < 20 && `${20 - streak} more for 💎`}
                            {streak >= 20 && streak < 30 && `${30 - streak} more for 🏆`}
                            {streak >= 30 && 'All badges unlocked! 🎉'}
                        </div>
                    </div>

                    <button
                        onClick={onPlayAgain}
                        className="w-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all mb-3"
                    >
                        Next Level →
                    </button>
                    <button
                        onClick={onShare}
                        className="w-full text-gray-500 py-3 text-sm font-medium hover:text-gray-900 flex items-center justify-center gap-2 transition-colors"
                    >
                        <Share2 size={16} />
                        Share Results
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
