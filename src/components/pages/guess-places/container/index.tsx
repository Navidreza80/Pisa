"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BarChart4, Clock, Flame, Heart, Sparkles, Trophy } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import confetti from "canvas-confetti";
import { Progress } from "@/components/ui/Progress";

// Components
import { GameScreen } from "../content/components/GameScreen";
import { GameOverScreen } from "../content/components/GameOverScreen";
import { GameModeSelection } from "../content/components/GameModeSelection";
import { LoadingScreen } from "../content/components/LoadingScreen";
import { StatsDialog } from "../content/components/StatsDialog";
import { LeaderboardDialog } from "../content/components/LeaderboardDialog";

// Hooks
import { useMousePosition } from "../content/hooks/useMousePosition";
import { useTheme } from "../content/hooks/useTheme";
import { useHighScores } from "../content/hooks/useHighScores";
import { useGameState } from "../content/hooks/useGameState";

// Types and constants
import { GameMode } from "../content/types/index";
import { GAME_MODES, TIMER_DURATION } from "../content/utils/constants";
import LoadingPage from "@/app/loading";

// Main component
export default function GuessThePlace() {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const { mousePosition, handleMouseMove } = useMousePosition(containerRef);
  const { isDark, toggleTheme } = useTheme();
  const { highScores, showLeaderboard, setShowLeaderboard, addHighScore } =
    useHighScores();
  const {
    // Game state
    gameState: {
      places,
      currentPlace,
      currentIndex,
      guess,
      result,
      score,
      gameOver,
      showHint,
      hintIndex,
      inputDisabled,
      loading,
      gameMode,
      timeLeft,
      isTimerActive,
      streak,
      maxStreak,
      showStats,
      lives,
      showAnswer,
      difficulty,
      isImageBlurred,
      blurLevel,
    },
    // Actions
    actions: {
      setGuess,
      setShowStats,
      setDifficulty,
      checkGuess,
      resetGame,
      startGame,
      showNextHint,
      reduceBlur,
      handleKeyPress,
    },
    // Computed values
    computed: { progressValue },
  } = useGameState({ scoreRef, addHighScore });

  // Effects for confetti
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  useEffect(() => {
    if (result === "correct") {
      triggerConfetti();
    }
  }, [result, triggerConfetti]);

  // Main render
  if (loading) return <LoadingPage />;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen text-text flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden transition-colors duration-500"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70" />

      {/* Streak display */}
      {streak > 0 && !gameOver && (
        <div className="absolute top-4 left-16 px-4 py-2 rounded-full flex items-center gap-2 z-10">
          <Flame className="text-red-500" size={20} />
          <span className="text-lg font-bold">{streak}x</span>
        </div>
      )}

      <div className="absolute top-4 right-16 px-4 py-2 rounded-full flex items-center gap-2 z-10">
        <Trophy className="text-yellow-500 my-auto" size={17} />
        <p className="text-lg font-bold">{score}</p>
      </div>

      {/* Dialogs */}
      <StatsDialog
        showStats={showStats}
        setShowStats={setShowStats}
        score={score}
        maxStreak={maxStreak}
        difficulty={difficulty}
        gameMode={gameMode}
        setShowLeaderboard={setShowLeaderboard}
      />
      <LeaderboardDialog
        showLeaderboard={showLeaderboard}
        setShowLeaderboard={setShowLeaderboard}
        highScores={highScores}
      />

      {/* Main content */}
      <AnimatePresence mode="wait">
        {gameOver ? (
          <GameOverScreen
            score={score}
            maxStreak={maxStreak}
            startGame={startGame}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            setShowLeaderboard={setShowLeaderboard}
            setShowStats={setShowStats}
            mousePosition={mousePosition}
          />
        ) : currentPlace && !gameMode ? (
          <GameModeSelection
            startGame={startGame}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            highScores={highScores}
            setShowLeaderboard={setShowLeaderboard}
            mousePosition={mousePosition}
          />
        ) : currentPlace ? (
          <GameScreen
            currentPlace={currentPlace}
            currentIndex={currentIndex}
            guess={guess}
            setGuess={setGuess}
            handleKeyPress={handleKeyPress}
            checkGuess={checkGuess}
            resetGame={resetGame}
            inputDisabled={inputDisabled}
            result={result}
            showAnswer={showAnswer}
            showHint={showHint}
            showNextHint={showNextHint}
            hintIndex={hintIndex}
            gameMode={gameMode}
            timeLeft={timeLeft}
            progressValue={progressValue}
            score={score}
            streak={streak}
            lives={lives}
            isImageBlurred={isImageBlurred}
            reduceBlur={reduceBlur}
            blurLevel={blurLevel}
            mousePosition={mousePosition}
            gameOver={gameOver}
            setShowStats={setShowStats}
            showStats={showStats}
          />
        ) : null}
      </AnimatePresence>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        .animate-glitch {
          animation: glitch 0.2s ease-in-out;
        }

        .score-pulse {
          animation: score-pulse 0.5s ease-in-out;
        }
        @keyframes score-pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
