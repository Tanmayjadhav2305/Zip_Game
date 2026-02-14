import React from 'react';
import { ArrowLeft, HelpCircle, Settings } from 'lucide-react';

interface HeaderProps {
    timer: string;
    onClear: () => void;
    onBack?: () => void;
    onSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ timer, onClear, onBack, onSettings }) => {
    return (
        <div className="w-full max-w-md px-6 py-4 flex flex-col">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={onBack}
                    className="p-2 -ml-2 text-gray-900 rounded-full hover:bg-black/5 transition-colors"
                >
                    <ArrowLeft size={24} strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-1.5 font-bold text-lg text-gray-900 absolute left-1/2 -translate-x-1/2">
                    <div className="bg-black text-white text-[10px] font-bold px-[3px] py-[1px] rounded-[2px] leading-none h-4 flex items-center justify-center">in</div>
                    <span className="text-xl tracking-tight">Zip</span>
                </div>

                <div className="flex gap-2">
                    <button className="p-2 text-gray-900 rounded-full hover:bg-black/5 transition-colors">
                        <HelpCircle size={24} strokeWidth={2.5} />
                    </button>
                    <button
                        onClick={onSettings}
                        className="p-2 -mr-2 text-gray-900 rounded-full hover:bg-black/5 transition-colors"
                    >
                        <Settings size={24} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Timer & Clear Row */}
            <div className="flex justify-between items-center px-1">
                <div className="text-gray-500 font-medium font-mono text-sm tracking-wide opacity-80">
                    ⏱ {timer}
                </div>
                <button
                    onClick={onClear}
                    className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-900 shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};
