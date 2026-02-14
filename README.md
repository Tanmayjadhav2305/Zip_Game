# 🎮 Zip Game - LinkedIn Puzzle Clone

A beautiful, feature-rich puzzle game inspired by LinkedIn's Zip game. Built with React, TypeScript, and Framer Motion with buttery-smooth 60fps+ animations optimized for mobile devices.

![Zip Game](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎯 Core Gameplay
- **Touch & Drag Path Creation** - Smooth drag-to-connect mechanics on mobile and desktop
- **Smart Backtracking** - Tap previous cells to undo moves
- **Visual Feedback** - Beautiful animations and sound effects for every action
- **Adaptive Difficulty** - Progressive difficulty from 3 to 22 checkpoints

### 🏆 Progression System
- **Streak Tracking** - Track consecutive level completions
- **Badge System** - Unlock badges at 10, 20, and 30+ streaks (⭐💎🏆)
- **Score Calculation** - Points based on checkpoints, time, and difficulty
- **Milestone Celebrations** - Special animations for streak achievements

### 💡 Hints & Assistance
- **Intelligent Hint System** - Shows next 2-3 steps or corrects wrong paths
- **Visual Indicators** - Pulsing blue rings highlight hint cells
- **Smart Cooldown** - 5-second cooldown prevents hint spam

### 📱 Mobile Optimized
- **60fps+ Animations** - GPU-accelerated, buttery-smooth path animations
- **Touch-First Design** - Optimized pointer events for all devices
- **Responsive UI** - Perfect layout on all screen sizes
- **High Refresh Rate Support** - Optimized for 90Hz/120Hz displays

### 🎨 Polished UI/UX
- **Beautiful Gradient Design** - Modern orange-themed interface
- **Smooth Transitions** - Spring animations powered by Framer Motion
- **Victory Modal** - Comprehensive stats with share functionality
- **Settings Panel** - Sound toggle and credits

### 📊 Sharing
- **Native Share API** - Share results directly to social media (mobile)
- **Clipboard Fallback** - Automatic clipboard copy on desktop
- **Formatted Stats** - Beautiful share text with emojis

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast development server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Vitest** - Unit testing
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Tanmayjadhav2305/Zip_Game.git

# Navigate to project directory
cd Zip_Game

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🎮 How to Play

1. **Start**: Tap/click on any numbered cell to begin your path
2. **Connect**: Drag across adjacent cells or tap them one by one
3. **Order Matters**: Connect all numbered cells in sequential order (1→2→3...)
4. **Backtrack**: Tap previous cell or use Undo button to fix mistakes
5. **Win**: Complete the path connecting all numbers to win!

## 🎯 Game Mechanics

### Path Creation
- **Drag Mode**: Touch and hold, then drag across cells
- **Tap Mode**: Tap cells one-by-one to build path
- **Adjacency Rule**: Only horizontal/vertical moves (no diagonals)

### Scoring System
```
Score = (Checkpoints × 100 + Time Bonus) × Difficulty Multiplier

Time Bonus: Max 600 points (faster = more points)
Difficulty Multipliers:
- Easy (Levels 1-2): 1.5x
- Medium (Levels 3-5): 2x
- Hard (Levels 6-8): 2.5x
- Expert (Levels 9-12): 3x
- Insane (Levels 13+): 3x
```

### Difficulty Progression
- **Easy**: 3-5 checkpoints
- **Medium**: 6-8 checkpoints
- **Hard**: 9-12 checkpoints
- **Expert**: 13-17 checkpoints
- **Insane**: 19-22 checkpoints

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── Cell.tsx       # Individual grid cell
│   ├── Grid.tsx       # Game grid container
│   ├── Header.tsx     # Top navigation
│   ├── BottomSheet.tsx # Undo/Hint controls
│   ├── VictoryModal.tsx # Win screen
│   ├── SettingsModal.tsx # Settings panel
│   └── PathLayer.tsx  # SVG path rendering
├── game/              # Game logic
│   ├── types.ts       # Type definitions
│   ├── logic.ts       # Core game logic
│   ├── generator.ts   # Level generation
│   └── logic.test.ts  # Unit tests
├── hooks/             # Custom React hooks
│   └── useZipGame.ts  # Main game hook
├── utils/             # Utilities
│   └── sounds.ts      # Sound manager
├── data/              # Static data
│   └── levels.ts      # Level definitions
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## 🎨 Performance Optimizations

### Mobile Performance
- **GPU Acceleration**: `translate3d()` for all animations
- **Memoization**: `useMemo` prevents unnecessary recalculations
- **Optimized Springs**: Tuned stiffness/damping for 60fps+
- **Reduced Shadows**: Lighter filters for better performance
- **Touch optimization**: `touch-action: manipulation` for instant response

### Animation Tuning
```typescript
// PathLayer Spring Configuration
stiffness: 600  // Snappy response
damping: 40     // Minimal oscillation
mass: 0.2       // Light, fast movement
restDelta: 0.001 // Quick settling
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🎯 Roadmap

- [ ] Daily challenges with unique puzzles
- [ ] Leaderboard system
- [ ] Multiplayer mode
- [ ] Custom level creator
- [ ] Dark mode toggle
- [ ] Multiple color themes
- [ ] Achievement system
- [ ] Tutorial mode

## 👨‍💻 Developer

**Designed & Developed by Tanmay Jadhav**

© 2026 All rights reserved

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by LinkedIn's Zip puzzle game
- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

⭐ Star this repo if you like it! PRs are welcome!
