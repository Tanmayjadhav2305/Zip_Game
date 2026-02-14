import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    soundEnabled: boolean;
    onToggleSound: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    soundEnabled,
    onToggleSound
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl p-6 max-w-sm mx-auto shadow-2xl"
                        style={{
                            maxHeight: 'calc(100svh - 80px)', // Small viewport height for mobile with safe areas
                            overflowY: 'auto',
                            transform: 'translate3d(0, -50%, 0)', // GPU acceleration
                        }}
                        initial={{ scale: 0.9, opacity: 0, y: '-50%' }}
                        animate={{ scale: 1, opacity: 1, y: '-50%' }}
                        exit={{ scale: 0.9, opacity: 0, y: '-50%' }}
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 300,
                            mass: 0.8
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <X size={24} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Settings Options */}
                        <div className="space-y-4">
                            {/* Sound Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    {soundEnabled ? (
                                        <Volume2 size={24} className="text-gray-700" />
                                    ) : (
                                        <VolumeX size={24} className="text-gray-400" />
                                    )}
                                    <span className="text-lg font-medium text-gray-900">Sound</span>
                                </div>
                                <button
                                    onClick={onToggleSound}
                                    className={`relative w-14 h-8 rounded-full transition-colors ${soundEnabled ? 'bg-orange-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <motion.div
                                        className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow"
                                        animate={{ x: soundEnabled ? 24 : 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                </button>
                            </div>

                            {/* About */}
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-xs text-gray-500 text-center font-medium">
                                    Designed & Developed by<br />Tanmay Jadhav
                                </p>
                                <p className="text-xs text-gray-400 text-center mt-2">
                                    © {new Date().getFullYear()} All rights reserved
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
