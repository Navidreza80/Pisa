"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  BarChart4,
  Camera,
  Check,
  ChevronRight,
  Clock,
  Flame,
  Heart,
  Info,
  Medal,
  MoonIcon,
  Shuffle,
  Sparkles,
  SunIcon,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import getRandomPlaces from "./placeData";

// Types
type Place = {
  id: number;
  name: string;
  image: string;
  hints: string[];
};

type GameMode = "Normal" | "time_attack" | "endless";
type Difficulty = "easy" | "medium" | "hard";
type GuessResult = "correct" | "incorrect" | null;

// Constants
const GAME_MODES = {
  NORMAL: "Normal" as GameMode,
  TIME_ATTACK: "time_attack" as GameMode,
  ENDLESS: "endless" as GameMode,
};

const TIMER_DURATION = 30;
const INITIAL_LIVES = 3;
const INITIAL_BLUR_LEVEL = 10;

// Custom hooks
const useMousePosition = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / containerRef.current.offsetWidth - 0.5,
        y: (e.clientY - rect.top) / containerRef.current.offsetHeight - 0.5,
      });
    }
  }, [containerRef]);

  return { mousePosition, handleMouseMove };
};

const useTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }, [isDark]);

  return { isDark, toggleTheme };
};

const useHighScores = () => {
  const [highScores, setHighScores] = useState<{ name: string; score: number }[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const savedScores = localStorage.getItem("highScores");
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  const addHighScore = useCallback((score: number) => {
    if (score > 0) {
      const newHighScores = [...highScores, { name: "Player", score }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      setHighScores(newHighScores);
      localStorage.setItem("highScores", JSON.stringify(newHighScores));
    }
  }, [highScores]);

  return { highScores, showLeaderboard, setShowLeaderboard, addHighScore };
};

// Component
export default function GuessThePlace() {
  // State
  const [places, setPlaces] = useState<Place[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<GuessResult>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startGameModal, setStartGameModal] = useState(true);
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [isImageBlurred, setIsImageBlurred] = useState(true);
  const [blurLevel, setBlurLevel] = useState(INITIAL_BLUR_LEVEL);
  
  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Custom hooks
  const { mousePosition, handleMouseMove } = useMousePosition(containerRef);
  const { isDark, toggleTheme } = useTheme();
  const { highScores, showLeaderboard, setShowLeaderboard, addHighScore } = useHighScores();

  // Memoized values
  const currentPlace = useMemo(
    () => places[currentIndex] || null,
    [places, currentIndex]
  );
  
  const progressValue = useMemo(() => (timeLeft / TIMER_DURATION) * 100, [timeLeft]);
  
  const difficultyMultiplier = useMemo(() => {
    return difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2;
  }, [difficulty]);

  // Effects
  useEffect(() => {
    const randomPlaces = getRandomPlaces();
    setPlaces(randomPlaces);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (gameMode === GAME_MODES.TIME_ATTACK && isTimerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (
      gameMode === GAME_MODES.TIME_ATTACK &&
      timeLeft === 0 &&
      isTimerActive
    ) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isTimerActive, gameMode]);

  // Handlers
  const handleTimeUp = useCallback(() => {
    setIsTimerActive(false);
    setInputDisabled(true);
    setResult("incorrect");
    setShowAnswer(true);

    setTimeout(() => {
      if (lives > 1) {
        setLives((prev) => prev - 1);
        resetRound();
      } else {
        setGameOver(true);
        setStartGameModal(false);
        addHighScore(score);
      }
    }, 2000);
  }, [lives, score, addHighScore]);

  const resetRound = useCallback(() => {
    setTimeLeft(TIMER_DURATION);
    setIsTimerActive(true);
    setGuess("");
    setResult(null);
    setShowHint(false);
    setHintIndex(0);
    setInputDisabled(false);
    setShowAnswer(false);
    setIsImageBlurred(true);
    setBlurLevel(INITIAL_BLUR_LEVEL);

    if (currentIndex < places.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (gameMode === GAME_MODES.ENDLESS) {
        const randomPlaces = getRandomPlaces();
        setPlaces(randomPlaces);
        setCurrentIndex(0);
      } else {
        setGameOver(true);
      }
    }
  }, [currentIndex, places.length, gameMode]);

  const startGame = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setScore(0);
    setStreak(0);
    setCurrentIndex(0);
    setGameOver(false);
    setLives(INITIAL_LIVES);

    if (mode === GAME_MODES.TIME_ATTACK) {
      setTimeLeft(TIMER_DURATION);
      setIsTimerActive(true);
    }

    setIsImageBlurred(true);
    setBlurLevel(INITIAL_BLUR_LEVEL);
  }, []);

  const checkGuess = useCallback(() => {
    if (loading || !places.length || inputDisabled || !currentPlace) return;

    const isCorrect =
      guess.trim().toLowerCase() === currentPlace.name.toLowerCase();

    if (isCorrect) {
      setShowConfetti(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
      
      let pointsEarned = 10 * difficultyMultiplier;
      if (gameMode === GAME_MODES.TIME_ATTACK) {
        pointsEarned += Math.floor(timeLeft * 0.5);
      }
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }

      if (newStreak >= 3) {
        pointsEarned = Math.floor(pointsEarned * (1 + newStreak * 0.1));
      }

      setResult("correct");
      setScore((prev) => prev + Math.floor(pointsEarned));
      setInputDisabled(true);
      
      if (scoreRef.current) {
        scoreRef.current.classList.add("score-pulse");
        setTimeout(() => {
          if (scoreRef.current) {
            scoreRef.current.classList.remove("score-pulse");
          }
        }, 500);
      }

      setTimeout(() => {
        setShowConfetti(false);
        resetRound();
      }, 2000);
    } else {
      setResult("incorrect");
      setStreak(0);
      setInputDisabled(true);
      setShowAnswer(true);
      
      if (gameMode === GAME_MODES.NORMAL) {
        setTimeout(() => {
          resetGame();
        }, 2000);
      } else {
        setTimeout(() => {
          if (lives > 1) {
            setLives((prev) => prev - 1);
            resetRound();
          } else {
            setGameOver(true);
            setStartGameModal(false);
            addHighScore(score);
          }
        }, 2000);
      }
    }
  }, [loading, places.length, inputDisabled, currentPlace, guess, difficultyMultiplier, gameMode, timeLeft, streak, maxStreak, lives, score, resetRound, addHighScore]);

  const showNextHint = useCallback(() => {
    if (currentPlace && hintIndex < currentPlace.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
    setShowHint(true);

    if (gameMode !== GAME_MODES.NORMAL) {
      setScore((prev) => Math.max(0, prev - 5));
    }
  }, [currentPlace, hintIndex, gameMode]);

  const reduceBlur = useCallback(() => {
    if (blurLevel > 0) {
      setBlurLevel((prev) => Math.max(0, prev - 2));

      if (gameMode !== GAME_MODES.NORMAL) {
        setScore((prev) => Math.max(0, prev - 3));
      }
    }

    if (blurLevel <= 2) {
      setIsImageBlurred(false);
    }
  }, [blurLevel, gameMode]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !inputDisabled) {
      checkGuess();
    }
  }, [checkGuess, inputDisabled]);

  const resetGame = useCallback(() => {
    const randomPlaces = getRandomPlaces();
    setPlaces(randomPlaces);
    setCurrentIndex(0);
    setGuess("");
    setResult(null);
    setScore(0);
    setStreak(0);
    setGameOver(true);
    setShowHint(false);
    setHintIndex(0);
    setInputDisabled(false);
    setTimeLeft(TIMER_DURATION);
    setIsTimerActive(false);
    setLives(INITIAL_LIVES);
    setShowAnswer(false);
    setIsImageBlurred(true);
    setBlurLevel(INITIAL_BLUR_LEVEL);
  }, []);

  // UI Components
  const renderLoadingScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-black dark:to-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p className="text-lg animate-pulse">در حال بارگذاری بازی...</p>
      </div>
    </div>
  );

  const renderGameOverScreen = () => (
    <motion.div
      key="game-over"
      className="w-full max-w-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden p-8 text-center z-10 border border-white/50 dark:border-gray-800/50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <Trophy className="text-yellow-400 w-20 h-20 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4">بازی تمام شد!</h2>
      <p className="text-xl mb-2">
        امتیاز نهایی شما:{" "}
        <span className="text-primary font-bold text-2xl">{score}</span>
      </p>
      <p className="text-lg mb-8">
        بیشترین امتیاز متوالی:{" "}
        <span className="text-orange-500 font-bold">{maxStreak}x</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button
          onClick={() => startGame(GAME_MODES.NORMAL)}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-6"
        >
          <Zap className="mr-2" size={20} />
          حالت عادی
        </Button>
        <Button
          onClick={() => startGame(GAME_MODES.TIME_ATTACK)}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6"
        >
          <Clock className="mr-2" size={20} />
          حالت زمان محدود
        </Button>
        <Button
          onClick={() => startGame(GAME_MODES.ENDLESS)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6"
        >
          <Shuffle className="mr-2" size={20} />
          حالت بی‌پایان
        </Button>
      </div>

      <div className="bg-white/20 dark:bg-white/10 p-4 rounded-xl mb-6">
        <h3 className="text-lg font-bold mb-2 flex items-center justify-center gap-2">
          <Info size={18} className="text-blue-400" />
          انتخاب سطح دشواری
        </h3>
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => setDifficulty("easy")}
            variant={difficulty === "easy" ? "default" : "outline"}
            className={
              difficulty === "easy"
                ? "bg-green-500 hover:bg-green-600"
                : "border-white/20"
            }
          >
            آسان
          </Button>
          <Button
            onClick={() => setDifficulty("medium")}
            variant={difficulty === "medium" ? "default" : "outline"}
            className={
              difficulty === "medium"
                ? "bg-blue-500 hover:bg-blue-600"
                : "border-white/20"
            }
          >
            متوسط
          </Button>
          <Button
            onClick={() => setDifficulty("hard")}
            variant={difficulty === "hard" ? "default" : "outline"}
            className={
              difficulty === "hard"
                ? "bg-red-500 hover:bg-red-600"
                : "border-white/20"
            }
          >
            سخت
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setShowLeaderboard(true)}
          variant="outline"
          className="border-white/20 text-black dark:text-white hover:bg-white/10"
        >
          <Trophy className="mr-2" size={18} />
          جدول امتیازات
        </Button>
        <Button
          onClick={() => setShowStats(true)}
          variant="outline"
          className="border-white/20 text-black dark:text-white hover:bg-white/10"
        >
          <BarChart4 className="mr-2" size={18} />
          آمار بازی
        </Button>
      </div>
    </motion.div>
  );

  const renderGameModeSelection = () => (
    <motion.div
      key="game-mode-selection"
      className="w-full max-w-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden p-8 z-10 border border-white/50 dark:border-gray-800/50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        انتخاب حالت بازی
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-8">
        <Button
          onClick={() => startGame(GAME_MODES.NORMAL)}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-lg py-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="relative flex items-center justify-center gap-3">
            <Zap className="text-white" size={24} />
            <div className="text-right">
              <span className="block text-xl">حالت عادی</span>
              <span className="text-xs opacity-80">
                بدون محدودیت زمان، مناسب برای تازه‌کارها
              </span>
            </div>
          </div>
        </Button>

        <Button
          onClick={() => startGame(GAME_MODES.TIME_ATTACK)}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg py-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="relative flex items-center justify-center gap-3">
            <Clock className="text-white" size={24} />
            <div className="text-right">
              <span className="block text-xl">حالت زمان محدود</span>
              <span className="text-xs opacity-80">
                30 ثانیه برای هر حدس، چالشی و هیجان‌انگیز
              </span>
            </div>
          </div>
        </Button>

        <Button
          onClick={() => startGame(GAME_MODES.ENDLESS)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg py-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="relative flex items-center justify-center gap-3">
            <Shuffle className="text-white" size={24} />
            <div className="text-right">
              <span className="block text-xl">حالت بی‌پایان</span>
              <span className="text-xs opacity-80">
                بازی تا زمانی که اشتباه کنید ادامه دارد
              </span>
            </div>
          </div>
        </Button>
      </div>

      <div className="bg-white/20 dark:bg-white/10 p-4 rounded-xl mb-6">
        <h3 className="text-lg font-bold mb-2 flex items-center justify-center gap-2">
          <Info size={18} className="text-blue-400" />
          انتخاب سطح دشواری
        </h3>
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => setDifficulty("easy")}
            variant={difficulty === "easy" ? "default" : "outline"}
            className={
              difficulty === "easy"
                ? "bg-green-500 hover:bg-green-600"
                : "border-white/20"
            }
          >
            آسان
          </Button>
          <Button
            onClick={() => setDifficulty("medium")}
            variant={difficulty === "medium" ? "default" : "outline"}
            className={
              difficulty === "medium"
                ? "bg-blue-500 hover:bg-blue-600"
                : "border-white/20"
            }
          >
            متوسط
          </Button>
          <Button
            onClick={() => setDifficulty("hard")}
            variant={difficulty === "hard" ? "default" : "outline"}
            className={
              difficulty === "hard"
                ? "bg-red-500 hover:bg-red-600"
                : "border-white/20"
            }
          >
            سخت
          </Button>
        </div>
      </div>

      {highScores.length > 0 && (
        <Button
          onClick={() => setShowLeaderboard(true)}
          variant="outline"
          className="w-full border-white/20 text-black dark:text-white hover:bg-white/10"
        >
          <Trophy className="mr-2" size={18} />
          مشاهده جدول امتیازات
        </Button>
      )}
    </motion.div>
  );

  const renderGameScreen = () => (
    <motion.div
      key={`place-${currentIndex}`}
      className="w-full max-w-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-white/50 dark:border-gray-800/50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {showConfetti && (
        <div className="absolute inset-0 z-20 pointer-events-none"></div>
      )}

      <div className="relative">
        <div ref={imageRef} className="relative overflow-hidden h-64">
          <Image
            src={currentPlace?.image || ""}
            alt="حدس بزن"
            width={600}
            height={300}
            className={`w-full h-64 object-cover transition-all duration-500 ${isImageBlurred ? "scale-110" : "scale-100"}`}
            style={{
              filter: isImageBlurred ? `blur(${blurLevel}px)` : "none",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                سوال {currentIndex + 1} از 15
              </Badge>

              {isImageBlurred && (
                <Button
                  onClick={reduceBlur}
                  size="sm"
                  variant="outline"
                  className="bg-white/20 text-white border-white/20 hover:bg-white/30 flex items-center gap-1"
                >
                  <Camera size={14} />
                  واضح‌تر کردن
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6 text-right">
        <Tabs defaultValue="guess" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="guess" className="flex-1">
              حدس بزن
            </TabsTrigger>
            <TabsTrigger value="hints" className="flex-1">
              راهنماها
            </TabsTrigger>
            {gameMode === GAME_MODES.TIME_ATTACK && (
              <TabsTrigger value="stats" className="flex-1">
                آمار
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="guess" className="mt-0">
            <div className="relative mb-4">
              <Input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اسم مکان را وارد کن"
                className="text-right bg-white/20 dark:bg-white/10 text-black dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 focus:ring-primary pr-4"
                disabled={inputDisabled}
              />

              {result && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  {result === "correct" ? (
                    <Check className="text-green-400" size={20} />
                  ) : (
                    <X className="text-red-400" size={20} />
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <Button
                onClick={checkGuess}
                disabled={inputDisabled}
                className="bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-600 text-white font-bold flex-1"
              >
                بررسی
              </Button>
              <Button
                onClick={resetGame}
                variant="secondary"
                className="bg-white/20 dark:bg-white/10 text-black dark:text-white hover:bg-white/30 dark:hover:bg-white/20"
              >
                شروع دوباره
              </Button>
            </div>

            {result && (
              <motion.div
                className={`mt-6 p-4 rounded-lg ${result === "correct" ? "bg-green-500/20" : "bg-red-500/20"} flex items-center gap-3`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {result === "correct" ? (
                  <>
                    <Check className="text-green-400" size={24} />
                    <p className="font-bold">آفرین! درست حدس زدی!</p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="text-red-400" size={24} />
                    <div>
                      <p className="font-bold">اشتباه بود!</p>
                      {showAnswer && currentPlace && (
                        <p className="text-sm">
                          پاسخ صحیح: {currentPlace.name}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="hints" className="mt-0">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
                <ChevronRight className="text-primary" size={20} />
                راهنماها:
              </h2>
              <div className="space-y-2">
                {showHint && currentPlace ? (
                  currentPlace.hints
                    .slice(0, hintIndex + 1)
                    .map((hint, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/10 dark:bg-white/5 p-3 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {hint}
                      </motion.div>
                    ))
                ) : (
                  <Button
                    onClick={showNextHint}
                    variant="outline"
                    className="border-white/20 text-black dark:text-white hover:bg-white/10 w-full"
                  >
                    نمایش راهنمایی
                  </Button>
                )}

                {showHint &&
                  currentPlace &&
                  hintIndex < currentPlace.hints.length - 1 && (
                    <Button
                      onClick={showNextHint}
                      variant="outline"
                      className="border-white/20 text-black dark:text-white hover:bg-white/10 w-full mt-2"
                    >
                      راهنمایی بیشتر
                    </Button>
                  )}
              </div>
            </div>
          </TabsContent>

          {gameMode === GAME_MODES.TIME_ATTACK && (
            <TabsContent value="stats" className="mt-0">
              <div className="space-y-4">
                <div className="bg-white/10 dark:bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      زمان باقیمانده
                    </span>
                    <span className="font-bold">{timeLeft} ثانیه</span>
                  </div>
                  <Progress value={progressValue} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 dark:bg-white/5 p-4 rounded-lg flex flex-col">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      امتیاز فعلی
                    </span>
                    <span className="font-bold text-xl">{score}</span>
                  </div>
                  <div className="bg-white/10 dark:bg-white/5 p-4 rounded-lg flex flex-col">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      امتیاز متوالی
                    </span>
                    <span className="font-bold text-xl">{streak}x</span>
                  </div>
                </div>

                <div className="bg-white/10 dark:bg-white/5 p-4 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">
                    جان‌های باقیمانده
                  </span>
                  <div className="flex gap-2">
                    <Heart
                      className={
                        lives >= 1 ? "text-red-500" : "text-gray-400"
                      }
                      size={24}
                    />
                    <Heart
                      className={
                        lives >= 2 ? "text-red-500" : "text-gray-400"
                      }
                      size={24}
                    />
                    <Heart
                      className={
                        lives >= 3 ? "text-red-500" : "text-gray-400"
                      }
                      size={24}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </motion.div>
  );

  const renderStatsDialog = () => (
    <Dialog open={showStats} onOpenChange={setShowStats}>
      <DialogContent className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-800/50 rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <BarChart4 className="text-indigo-400" size={24} />
            آمار بازی
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/20 dark:bg-white/5 p-4 rounded-lg flex flex-col items-center">
            <Trophy className="text-yellow-400 mb-2" size={24} />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              امتیاز فعلی
            </p>
            <p className="text-xl font-bold">{score}</p>
          </div>
          <div className="bg-white/20 dark:bg-white/5 p-4 rounded-lg flex flex-col items-center">
            <Flame className="text-orange-500 mb-2" size={24} />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              بیشترین امتیاز متوالی
            </p>
            <p className="text-xl font-bold">{maxStreak}</p>
          </div>
          <div className="bg-white/20 dark:bg-white/5 p-4 rounded-lg flex flex-col items-center">
            <Medal className="text-blue-400 mb-2" size={24} />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              سطح دشواری
            </p>
            <p className="text-xl font-bold">
              {difficulty === "easy"
                ? "آسان"
                : difficulty === "medium"
                ? "متوسط"
                : "سخت"}
            </p>
          </div>
          <div className="bg-white/20 dark:bg-white/5 p-4 rounded-lg flex flex-col items-center">
            <Zap className="text-purple-400 mb-2" size={24} />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              حالت بازی
            </p>
            <p className="text-xl font-bold">
              {gameMode === GAME_MODES.NORMAL
                ? "عادی"
                : gameMode === GAME_MODES.TIME_ATTACK
                ? "زمان محدود"
                : "بی‌پایان"}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={() => setShowLeaderboard(true)}
            variant="outline"
            className="w-full border-white/20 text-black dark:text-white hover:bg-white/10"
          >
            <Trophy className="text-yellow-400 mr-2" size={16} />
            مشاهده جدول امتیازات
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderLeaderboardDialog = () => (
    <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
      <DialogContent className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-800/50 rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="text-yellow-400" size={24} />
            جدول امتیازات
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-80 overflow-y-auto">
          {highScores.length > 0 ? (
            <div className="space-y-2">
              {highScores.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${index === 0 ? "bg-yellow-100/50 dark:bg-yellow-900/20" : "bg-white/20 dark:bg-white/5"}`}
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={index < 3 ? "default" : "secondary"}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      {index + 1}
                    </Badge>
                    <span className="font-medium">{entry.name}</span>
                  </div>
                  <span className="font-bold">{entry.score}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              هنوز امتیازی ثبت نشده است!
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  // Main render
  if (loading) {
    return renderLoadingScreen();
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-black dark:to-gray-900 text-text flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden transition-colors duration-500"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70" />

      {/* Score display */}
      <div
        ref={scoreRef}
        className="absolute top-4 right-4 bg-white/10 dark:bg-gray-800/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 z-10 transition-all duration-300"
      >
        <Trophy className="text-yellow-400" size={20} />
        <span className="text-xl font-bold">{score}</span>
      </div>

      {/* Lives display */}
      {(gameMode === GAME_MODES.TIME_ATTACK ||
        gameMode === GAME_MODES.ENDLESS) &&
        !gameOver && (
          <div className="absolute top-16 right-4 bg-white/10 dark:bg-gray-800/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 z-10">
            <Heart
              className={lives >= 3 ? "text-red-500" : "text-gray-400"}
              size={18}
            />
            <Heart
              className={lives >= 2 ? "text-red-500" : "text-gray-400"}
              size={18}
            />
            <Heart
              className={lives >= 1 ? "text-red-500" : "text-gray-400"}
              size={18}
            />
          </div>
        )}

      {/* Streak display */}
      {streak > 0 && !gameOver && (
        <div className="absolute top-4 left-16 bg-white/10 dark:bg-gray-800/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 z-10">
          <Flame className="text-orange-500" size={20} />
          <span className="text-lg font-bold">{streak}x</span>
        </div>
      )}

      {/* Timer display */}
      {gameMode === GAME_MODES.TIME_ATTACK && !gameOver && (
        <div className="absolute top-16 left-4 bg-white/10 dark:bg-gray-800/20 backdrop-blur-md px-4 py-2 rounded-full flex flex-col items-center z-10 w-20">
          <div className="flex items-center gap-1 mb-1">
            <Clock
              className={
                timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-blue-400"
              }
              size={16}
            />
            <span
              className={`text-sm font-bold ${timeLeft <= 10 ? "text-red-500 animate-pulse" : ""}`}
            >
              {timeLeft}s
            </span>
          </div>
          <Progress value={progressValue} className="h-1.5 w-full" />
        </div>
      )}

      {/* Stats button */}
      <button
        onClick={() => setShowStats(!showStats)}
        className="absolute top-16 left-28 bg-white/10 dark:bg-gray-800/20 backdrop-blur-md p-2 rounded-full z-10 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-colors"
      >
        <BarChart4 className="text-indigo-400" size={20} />
      </button>

      {/* Stats dialog */}
      {renderStatsDialog()}

      {/* Leaderboard dialog */}
      {renderLeaderboardDialog()}

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-6 flex items-center gap-3 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Sparkles className="text-yellow-400" size={32} />
        بازی حدس بزن کجاست؟
      </motion.h1>

      {/* Background effects */}
      <div
        className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl z-0"
        style={{
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-400/10 dark:bg-indigo-400/20 rounded-full blur-3xl z-0"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Main content */}
      <AnimatePresence mode="wait">
        {gameOver ? (
          renderGameOverScreen()
        ) : currentPlace && !gameMode ? (
          renderGameModeSelection()
        ) : currentPlace ? (
          renderGameScreen()
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