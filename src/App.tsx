import React, { useState, useEffect } from 'react';
import { useZipGame } from './hooks/useZipGame';
import { Grid } from './components/Grid';
import { Header } from './components/Header';
import { BottomSheet } from './components/BottomSheet';
import { VictoryModal } from './components/VictoryModal';
import { SettingsModal } from './components/SettingsModal';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [view, setView] = useState<'landing' | 'game'>('landing');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const {
        grid,
        path,
        isWon,
        timer,
        level,
        levelNumber,
        streak,
        totalScore,
        hintCell,
        hintCooldown,
        handlePointerDown,
        handlePointerEnter,
        handlePointerUp,
        undo,
        handleHint,
        clear,
        newGame
    } = useZipGame(soundEnabled);

    // Native Share functionality
    const handleShare = async () => {
        const shareText = `🎮 Zip Game Results\n\n🏆 Level: ${levelNumber}\n⏱️ Time: ${timer}\n🔥 Streak: ${streak}\n📊 Score: ${totalScore.toLocaleString()}\n\nCan you beat my score? 🚀`;

        // Try Web Share API (mobile & modern browsers)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Zip Game - My Score',
                    text: shareText,
                });
            } catch (err) {
                // User cancelled or error occurred
                console.log('Share cancelled or failed:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(shareText);
                alert('📋 Score copied to clipboard! Share it with your friends!');
            } catch (err) {
                alert('Unable to share. Please copy manually:\n\n' + shareText);
            }
        }
    };

    // Prevent default touch behaviors (pull-to-refresh, scroll) when playing
    useEffect(() => {
        const preventDefault = (e: TouchEvent) => {
            if (view === 'game') {
                e.preventDefault();
            }
        };
        document.body.addEventListener('touchmove', preventDefault, { passive: false });
        return () => document.body.removeEventListener('touchmove', preventDefault);
    }, [view]);

    return (
        <AnimatePresence mode="wait">
            {view === 'landing' ? (
                <LandingScreen key="landing" onStart={() => setView('game')} />
            ) : (
                <motion.div
                    key="game"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-screen bg-gradient-to-b from-orange-400 to-orange-600 flex items-center justify-center font-sans text-gray-900 select-none p-2 sm:p-4"
                >
                    {/* Rounded Card Interior */}
                    <div className="w-full max-w-md h-full sm:h-auto flex flex-col bg-gradient-to-b from-orange-50 to-orange-100 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden py-3 sm:py-4">
                        <Header
                            timer={timer}
                            onClear={clear}
                            onBack={() => setView('landing')}
                            onSettings={() => setSettingsOpen(true)}
                        />

                        <div className="flex-1 flex flex-col justify-center w-full px-2 sm:px-4 py-2">
                            {/* Level Number - Improved visibility */}
                            <div className="text-center mb-2">
                                <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-1.5 rounded-full shadow-sm">
                                    <span className="text-xs sm:text-sm font-bold text-orange-600">
                                        Level {levelNumber}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {level.solutionPath.filter((_, i) =>
                                            level.initialValues[level.solutionPath[i]] // Count checkpoints
                                        ).length} numbers
                                    </span>
                                </div>
                            </div>

                            <Grid
                                grid={grid}
                                path={path}
                                level={level}
                                hintCell={hintCell}
                                onPointerDown={handlePointerDown}
                                onPointerEnter={handlePointerEnter}
                                onPointerUp={handlePointerUp}
                            />
                        </div>

                        <BottomSheet
                            onUndo={undo}
                            onHint={handleHint}
                            hintCooldown={hintCooldown}
                        />

                        <AnimatePresence>
                            {isWon && (
                                <VictoryModal
                                    timer={timer}
                                    levelNumber={levelNumber}
                                    streak={streak}
                                    score={totalScore}
                                    onPlayAgain={newGame}
                                    onShare={handleShare}
                                />
                            )}
                        </AnimatePresence>

                        <SettingsModal
                            isOpen={settingsOpen}
                            onClose={() => setSettingsOpen(false)}
                            soundEnabled={soundEnabled}
                            onToggleSound={() => setSoundEnabled(!soundEnabled)}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Memoized Landing Screen to prevent flash
const LandingScreen = React.memo(({ onStart }: { onStart: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gradient-to-br from-[#ff6b35] via-[#ff5a1f] to-[#f7931e] text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans"
    >
        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
            <motion.div
                className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"
                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"
                animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            />
        </div>

        <div className="w-full max-w-sm flex flex-col items-center text-center z-10">
            <div className="mb-8 sm:mb-12">
                <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-[28px] sm:rounded-[36px] flex items-center justify-center backdrop-blur-md mb-6 mx-auto shadow-2xl border-2 border-white/20"
                >
                    {/* Enhanced Zip Icon */}
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="sm:w-16 sm:h-16">
                        <circle cx="6" cy="6" r="2" fill="white" />
                        <circle cx="18" cy="6" r="2" fill="white" />
                        <circle cx="18" cy="18" r="2" fill="white" />
                        <circle cx="6" cy="18" r="2" fill="white" />
                        <circle cx="12" cy="12" r="2" fill="white" />
                        <path d="M 6 6 L 12 12 L 18 6 M 12 12 L 18 18 M 12 12 L 6 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                </motion.div>
                <h1 className="text-5xl sm:text-6xl font-black mb-2 tracking-tight drop-shadow-lg">Zip</h1>
                <p className="text-lg sm:text-xl font-medium opacity-90">Connect the path</p>
            </div>

            <div className="flex items-center gap-2 mb-8 sm:mb-12 bg-white/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
                <span className="font-bold tracking-wide text-sm">🔥 Daily Challenge</span>
            </div>

            <button
                onClick={onStart}
                className="w-full bg-white text-[#ff5a1f] py-3.5 sm:py-4 px-8 rounded-full font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
                Start Playing
            </button>

            <p className="mt-6 sm:mt-8 text-sm sm:text-base opacity-75 font-medium">
                Tap and drag to connect numbers in order
            </p>

            {/* Developer Credit & Copyright */}
            <div className="mt-8 sm:mt-10 space-y-1">
                <p className="text-xs sm:text-sm font-medium opacity-80">
                    Designed & Developed by<br />Tanmay Jadhav
                </p>
                <p className="text-xs opacity-60">
                    © {new Date().getFullYear()} All rights reserved
                </p>
            </div>
        </div>
    </motion.div>
));

LandingScreen.displayName = 'LandingScreen';

export default App;
