"use client";

import confetti from "canvas-confetti";
import { AnimatePresence } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

// Css Import
import "@/app/[locale]/globals.css"

// Components
import { GameModeSelection } from "../content/components/GameModeSelection";
import { GameOverScreen } from "../content/components/GameOverScreen";
import { GameScreen } from "../content/components/GameScreen";
import { LeaderboardDialog } from "../content/components/LeaderboardDialog";
import { StatsDialog } from "../content/components/StatsDialog";

// Hooks
import { useGameState } from "../content/hooks/useGameState";
import { useHighScores } from "../content/hooks/useHighScores";
import { useMousePosition } from "../content/hooks/useMousePosition";
import { useTheme } from "../content/hooks/useTheme";

// Types and constants
import LoadingPage from "@/app/loading";

// Main component
export default function GuessThePlace() {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null); 

  // Custom hooks
  const { mousePosition, handleMouseMove } = useMousePosition(containerRef);
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
    </div>
  );
}
