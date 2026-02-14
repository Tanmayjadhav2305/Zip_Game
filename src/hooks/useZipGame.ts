import { useState, useEffect, useRef } from 'react';
import { getGrid, isValidMove, isLevelComplete } from '../game/logic';
import { generateLevel } from '../game/generator';
import { Cell, Level } from '../game/types';
import { soundManager } from '../utils/sounds';

export const useZipGame = (soundEnabled: boolean) => {
    // Track level progression
    const [levelNumber, setLevelNumber] = useState(1);

    // Generate initial level with random difficulty
    const getDifficulty = (levelNum: number): 'easy' | 'medium' | 'hard' | 'expert' | 'insane' => {
        if (levelNum <= 2) return 'easy';
        if (levelNum <= 5) return 'medium';
        if (levelNum <= 8) return 'hard';
        if (levelNum <= 12) return 'expert';
        return 'insane'; // 19-22 checkpoints!
    };

    const initialLevelResponse = generateLevel(levelNumber, getDifficulty(levelNumber) as any);
    const initialLevel = useRef<Level>(initialLevelResponse);

    // State
    const [level, setLevel] = useState<Level>(initialLevel.current);
    const [grid, setGrid] = useState<Cell[]>(getGrid(initialLevel.current));
    const [path, setPath] = useState<number[]>([]);
    const [hintCell, setHintCell] = useState<number | null>(null);
    const [hintCooldown, setHintCooldown] = useState(false);
    const [streak, setStreak] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    // Update sound manager when soundEnabled changes
    useEffect(() => {
        soundManager.setEnabled(soundEnabled);
    }, [soundEnabled]);

    // Timer state
    const [isWon, setIsWon] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [seconds, setSeconds] = useState(0);

    // Timer effect
    useEffect(() => {
        let interval: number | null = null;
        if (isActive && !isWon) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, isWon, seconds]);

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleHint = () => {
        if (!level.solutionPath) return;
        if (isWon) return;
        if (hintCooldown) return;

        // Find where user diverged from solution
        let lastCorrectIndex = -1;
        for (let i = 0; i < path.length; i++) {
            if (path[i] === level.solutionPath[i]) {
                lastCorrectIndex = i;
            } else {
                break;
            }
        }

        let hintPath: number[];

        // If user is on correct path, show next 2-3 steps
        if (lastCorrectIndex === path.length - 1) {
            const nextSteps = Math.min(3, level.solutionPath.length - path.length);
            hintPath = level.solutionPath.slice(0, path.length + nextSteps);
        } else {
            // User went wrong - show correct backtracked path
            hintPath = level.solutionPath.slice(0, Math.max(lastCorrectIndex + 2, 3));
        }

        // Save original path
        const originalPath = [...path];

        // Show hint path temporarily
        setPath(hintPath);
        soundManager.playHint();

        // Highlight hint cells
        if (hintPath.length > originalPath.length) {
            setHintCell(hintPath[hintPath.length - 1]);
        }

        // Restore original path after 2 seconds
        setTimeout(() => {
            setPath(originalPath);
            setHintCell(null);
        }, 2000);

        // Enable cooldown
        setHintCooldown(true);
        setTimeout(() => setHintCooldown(false), 5000);
    };

    // HYBRID: Support both click AND drag
    const [isDragging, setIsDragging] = useState(false);

    const handleCellInteraction = (id: number, isDrag: boolean = false) => {
        if (isWon) return;

        const currentHead = path[path.length - 1];

        // First cell - start path
        if (path.length === 0) {
            setPath([id]);
            soundManager.playMove();
            if (isDrag) setIsDragging(true);
            return;
        }

        // Clicking current head
        if (currentHead === id) {
            if (isDrag) setIsDragging(true);
            return;
        }

        // Clicking second-to-last cell - backtrack
        if (path.length > 1 && path[path.length - 2] === id) {
            setPath(prev => prev.slice(0, -1));
            soundManager.playMove();
            return;
        }

        // During drag, skip if already in path
        if (isDrag && path.includes(id)) return;

        // Check if cell is adjacent
        const currentCell = grid[currentHead];
        const targetCell = grid[id];

        const rowDiff = Math.abs(currentCell.row - targetCell.row);
        const colDiff = Math.abs(currentCell.col - targetCell.col);
        const isAdjacent = (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);

        // Connect if adjacent and not in path
        if (isAdjacent && !path.includes(id)) {
            setPath(prev => [...prev, id]);

            // Play sound
            if (targetCell.value !== null) {
                soundManager.playNumberHit();
            } else {
                soundManager.playMove();
            }
        }
    };

    const handlePointerDown = (id: number) => {
        handleCellInteraction(id, true);
    };

    const handlePointerEnter = (id: number) => {
        if (isDragging) {
            handleCellInteraction(id, true);
        }
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    // Level completion detection
    useEffect(() => {
        if (isLevelComplete(path)) {
            setIsWon(true);
            setIsActive(false);
            soundManager.playWin();

            // Calculate score: base points + time bonus + difficulty bonus
            const checkpointCount = Object.keys(level.initialValues).length;
            const basePoints = checkpointCount * 100;
            const timeBonus = Math.max(0, 300 - seconds) * 2;
            const difficultyMultiplier = levelNumber > 12 ? 3 : levelNumber > 8 ? 2.5 : levelNumber > 5 ? 2 : 1.5;
            const score = Math.floor((basePoints + timeBonus) * difficultyMultiplier);

            setTotalScore(prev => prev + score);
            setStreak(prev => prev + 1);
        }
    }, [path, level.initialValues, levelNumber, seconds]);

    const undo = () => {
        if (path.length > 1 && !isWon) {
            setPath(prev => prev.slice(0, -1));
            soundManager.playMove();
        }
    };

    const clear = () => {
        setPath([]);
        setIsWon(false);
        setSeconds(0);
        setIsActive(true);
    };

    const newGame = () => {
        const nextLevelNum = levelNumber + 1;
        const nextLevel = generateLevel(nextLevelNum, getDifficulty(nextLevelNum) as any);

        setLevelNumber(nextLevelNum);
        initialLevel.current = nextLevel;
        setLevel(nextLevel);
        setGrid(getGrid(nextLevel));

        // Find start cell for new grid
        setPath([nextLevel.solutionPath[0]]);

        setIsWon(false);
        setSeconds(0);
        setIsActive(true);
    };

    return {
        grid,
        path,
        isWon,
        timer: formatTime(seconds),
        streak,
        totalScore,
        handlePointerDown,
        handlePointerEnter,
        handlePointerUp,
        undo,
        handleHint,
        hintCell,
        hintCooldown,
        clear,
        level,
        levelNumber,
        newGame
    };
};
