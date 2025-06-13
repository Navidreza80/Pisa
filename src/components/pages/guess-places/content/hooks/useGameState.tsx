import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Difficulty, GameMode, GuessResult, Place } from "../types";
import { GAME_MODES, INITIAL_BLUR_LEVEL, INITIAL_LIVES, TIMER_DURATION } from "../utils/constants";
import getRandomPlaces from "../data/placeData";

type UseGameStateProps = {
  scoreRef: React.RefObject<HTMLDivElement>;
  addHighScore: (score: number) => void;
};

export const useGameState = ({ scoreRef, addHighScore }: UseGameStateProps) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<GuessResult>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameMode, setGameMode] = useState<GameMode | "">("");
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [showAnswer, setShowAnswer] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [isImageBlurred, setIsImageBlurred] = useState(true);
  const [blurLevel, setBlurLevel] = useState(INITIAL_BLUR_LEVEL);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const shuffledPlaces = getRandomPlaces(); 
    setPlaces(shuffledPlaces);
    setCurrentPlace(shuffledPlaces[0]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameMode === GAME_MODES.TIME_ATTACK) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, timeLeft, gameMode]);

  const handleTimeUp = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setInputDisabled(true);
    setResult("incorrect");
    setShowAnswer(true);

    setTimeout(() => {
      if (lives > 1) {
        setLives((prev) => prev - 1);
        nextPlace();
      } else {
        endGame();
      }
    }, 2000);
  }, [lives]);

  const progressValue = useMemo(() => {
    return (timeLeft / TIMER_DURATION) * 100;
  }, [timeLeft]);

  const checkGuess = useCallback(() => {
    if (!currentPlace || inputDisabled) return;

    setInputDisabled(true);
    const isCorrect = guess.trim().toLowerCase() === currentPlace.name.toLowerCase();
    setResult(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      let pointsToAdd = 10;
      if (difficulty === "hard") pointsToAdd = 15;
      if (difficulty === "easy") pointsToAdd = 5;
      if (!showHint) pointsToAdd += 5;
      if (isImageBlurred) pointsToAdd += blurLevel;

      const streakBonus = Math.floor(streak / 3) * 5;
      const totalPoints = pointsToAdd + streakBonus;

      setScore((prev) => prev + totalPoints);
      setStreak((prev) => prev + 1);
      setMaxStreak((prev) => Math.max(prev, streak + 1));

      if (scoreRef.current) {
        scoreRef.current.classList.add("score-pulse");
        setTimeout(() => {
          if (scoreRef.current) {
            scoreRef.current.classList.remove("score-pulse");
          }
        }, 500);
      }

      setTimeout(() => {
        nextPlace();
      }, 1500);
    } else {
      setShowAnswer(true);
      setStreak(0);

      setTimeout(() => {
        if (gameMode === GAME_MODES.NORMAL) {
          nextPlace();
        } else if (lives > 1) {
          setLives((prev) => prev - 1);
          nextPlace();
        } else {
          endGame();
        }
      }, 2000);
    }
  }, [currentPlace, guess, inputDisabled, difficulty, showHint, isImageBlurred, blurLevel, streak, scoreRef, gameMode, lives]);

  const nextPlace = useCallback(() => {
    if (currentIndex + 1 >= places.length) {
      if (gameMode === GAME_MODES.ENDLESS) {
        const shuffledPlaces = getRandomPlaces(); 
        setPlaces(shuffledPlaces);
        setCurrentPlace(shuffledPlaces[0]);
        setCurrentIndex(0);
      } else {
        endGame();
        return;
      }
    } else {
      setCurrentPlace(places[currentIndex + 1]);
      setCurrentIndex((prev) => prev + 1);
    }

    resetForNextPlace();
  }, [currentIndex, places, gameMode]);

  const resetForNextPlace = useCallback(() => {
    setGuess("");
    setResult(null);
    setShowHint(false);
    setHintIndex(0);
    setInputDisabled(false);
    setShowAnswer(false);
    setIsImageBlurred(true);
    setBlurLevel(INITIAL_BLUR_LEVEL);

    if (gameMode === GAME_MODES.TIME_ATTACK) {
      setTimeLeft(TIMER_DURATION);
      setIsTimerActive(true);
    }
  }, [gameMode]);

  const endGame = useCallback(() => {
    setGameOver(true);
    setInputDisabled(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerActive(false);
    addHighScore(score);
  }, [score, addHighScore]);

  const resetGame = useCallback(() => {
    setGameOver(false);
    setGameMode("");
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setLives(INITIAL_LIVES);
    setTimeLeft(TIMER_DURATION);
    setIsTimerActive(false);

    const shuffledPlaces = getRandomPlaces(); 
    setPlaces(shuffledPlaces);
    setCurrentPlace(shuffledPlaces[0]);
    setCurrentIndex(0);

    resetForNextPlace();
  }, [resetForNextPlace]);

  const startGame = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setGameOver(false);
    setScore(0);
    setStreak(0);
    setLives(INITIAL_LIVES);

    if (mode === GAME_MODES.TIME_ATTACK) {
      setTimeLeft(TIMER_DURATION);
      setIsTimerActive(true);
    }

    resetForNextPlace();
  }, [resetForNextPlace]);

  const showNextHint = useCallback(() => {
    if (!currentPlace) return;

    if (!showHint) {
      setShowHint(true);
    } else if (hintIndex < currentPlace.hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
  }, [currentPlace, showHint, hintIndex]);

  const reduceBlur = useCallback(() => {
    if (blurLevel > 0) {
      setBlurLevel((prev) => Math.max(0, prev - 2));
      if (blurLevel <= 2) {
        setIsImageBlurred(false);
      }
    }
  }, [blurLevel]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !inputDisabled && guess.trim()) {
      checkGuess();
    }
  }, [checkGuess, guess, inputDisabled]);

  return {
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
      blurLevel
    },
    actions: {
      setGuess,
      setShowStats,
      checkGuess,
      resetGame,
      startGame,
      showNextHint,
      reduceBlur,
      handleKeyPress,
      setDifficulty
    },
    computed: {
      progressValue
    }
  };
};
