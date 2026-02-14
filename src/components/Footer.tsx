import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FooterProps {
    onUndo: () => void;
    onHint: () => void; // Not implemented yet
}

export const Footer: React.FC<FooterProps> = ({ onUndo, onHint }) => {
    return (
        <div className="w-full max-w-md px-4 mt-6">
            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={onUndo}
                    className="flex-1 bg-white py-3 rounded-xl font-semibold text-gray-700 shadow-sm border border-gray-200 active:scale-95 transition-transform"
                >
                    Undo
                </button>
                <button
                    onClick={onHint}
                    className="flex-1 bg-white py-3 rounded-xl font-semibold text-gray-700 shadow-sm border border-gray-200 active:scale-95 transition-transform"
                >
                    Hint
                </button>
            </div>

            {/* How to Play Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">How to play</span>
                    <ChevronDown size={20} className="text-gray-500" />
                </div>
                <div className="flex gap-4 text-xs font-medium text-gray-500 items-start pt-2">
                    <div className="flex flex-col items-center flex-1 text-center">
                        <div className="flex gap-1 mb-1">
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                        </div>
                        <span>Connect the dots in order</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 text-center">
                        <div className="w-8 h-8 rounded border-2 border-zip-orange flex items-center justify-center mb-1">
                            <div className="w-full h-2 bg-zip-orange"></div>
                        </div>
                        <span>Fill every cell</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
