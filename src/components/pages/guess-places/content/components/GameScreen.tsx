import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BarChart4,
  Camera,
  Check,
  ChevronLeft,
  Clock,
  Heart,
  ListRestartIcon,
  Trophy,
  X,
} from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { GameMode, GuessResult, Place } from "../types";
import { GAME_MODES } from "../utils/constants";
import { MdRestartAlt } from "react-icons/md";

type GameScreenProps = {
  currentPlace: Place | null;
  currentIndex: number;
  guess: string;
  setShowStats: Dispatch<SetStateAction<boolean>>;
  showStats: boolean;
  setGuess: (guess: string) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  checkGuess: () => void;
  resetGame: () => void;
  inputDisabled: boolean;
  result: GuessResult;
  showAnswer: boolean;
  showHint: boolean;
  showNextHint: () => void;
  hintIndex: number;
  gameMode: GameMode | "";
  timeLeft: number;
  progressValue: number;
  score: number;
  streak: number;
  lives: number;
  isImageBlurred: boolean;
  reduceBlur: () => void;
  blurLevel: number;
  mousePosition: { x: number; y: number };
  gameOver: boolean;
};

export const GameScreen = ({
  currentPlace,
  currentIndex,
  guess,
  setGuess,
  handleKeyPress,
  checkGuess,
  resetGame,
  inputDisabled,
  result,
  showAnswer,
  showHint,
  showNextHint,
  hintIndex,
  gameMode,
  timeLeft,
  progressValue,
  score,
  streak,
  lives,
  isImageBlurred,
  reduceBlur,
  blurLevel,
  mousePosition,
  gameOver,
  setShowStats,
  showStats,
}: GameScreenProps) => (
  <motion.div
    key={`place-${currentIndex}`}
    className="w-full max-w-xl backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-border"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5 }}
    style={{
      transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
      transition: "transform 0.1s ease-out",
    }}
  >
    <div className="relative">
      <div className="relative overflow-hidden h-64">
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
                className="bg-background/20 text-white border-border/40 cursor-pointer flex gap-1"
              >
                <Camera size={14} />
                واضح‌تر کردن
              </Button>
            )}
          </div>
        </div>

        {/* Lives display */}
         {(gameMode === GAME_MODES.TIME_ATTACK ||
          gameMode === GAME_MODES.ENDLESS) &&
          !gameOver && (
          <div className="absolute top-1.5 right-3 backdrop-blur-lg bg-red-200/10 px-2 py-1.5 rounded-full flex items-center gap-2 z-10">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={lives > i ? "text-red-800" : "text-[#e4e4e4]"}
                size={18}
              />
            ))}
          </div>
        )}

        {/* Timer display */}
        {gameMode === GAME_MODES.TIME_ATTACK && !gameOver && (
          <div className="absolute top-1.5 left-3 backdrop-blur-md px-2 py-1 rounded-3xl flex flex-col items-center z-10 bg-background">
            <div className="flex items-center gap-1">
              <Clock
                className={
                  timeLeft <= 10 ? "text-red-600 animate-pulse" : "text-text"
                }
                size={16}
              />
              <span
                className={`text-sm font-bold ${timeLeft <= 10 ? "text-red-500 animate-pulse" : ""}`}
              >
                {timeLeft}s
              </span>
            </div>
          </div>
        )}
      </div>
    </div>

    <CardContent className="p-6 text-right">
      <Tabs defaultValue="guess" className="w-full">
        <TabsList className="w-full mb-4 bg-border">
          <TabsTrigger value="guess" className="flex-1 cursor-pointer">
            حدس بزن
          </TabsTrigger>
          <TabsTrigger value="hints" className="flex-1 cursor-pointer ">
            راهنماها
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guess" className="mt-0">
          <div className="relative mb-4">
            <Input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اسم مکان را وارد کن"
              className="text-right text-text border-border placeholder:text-text-secondary focus:ring-background rounded-xl h-11 pr-4"
              disabled={inputDisabled}
            />

            {result && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {result === "correct" ? (
                  <Check className="text-green-500" size={20} />
                ) : (
                  <X className="text-red-500" size={20} />
                )}
              </div>
            )}
          </div>

          <Button
            onClick={checkGuess}
            disabled={inputDisabled}
            className="bg-primary text-white font-bold flex-1 cursor-pointer w-full"
          >
            بررسی
          </Button>
          <div className="flex w-full justify-between mt-4">
            <Button
              onClick={resetGame}
              variant="secondary"
              className="text-text border w-[48%] border-border cursor-pointer shadow-none text-[16px] font-medium"
            >
              <MdRestartAlt className="text-text" size={20} />
              <h1 className="text-text font-medium">شروع دوباره</h1>
            </Button>

            {/* Stats button */}
            <Button
              onClick={() => setShowStats(!showStats)}
              className="cursor-pointer w-[45%] flex gap-2 p-2 z-10 bg-background hover:bg-background border border-border transition-colors"
            >
              <BarChart4 className="text-text" size={20} />
              <h1 className="text-text font-medium">دیدن آمار</h1>
            </Button>
          </div>

          {result && (
            <motion.div
              className={`mt-6 p-4 rounded-lg ${result === "correct" ? "bg-green-500/20" : "bg-red-500/20"} flex items-center gap-3 rtl`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {result === "correct" ? (
                <>
                  <Check className="text-green-400" size={24} />
                  <p className="font-bold">آفرین! درست حدس زدی</p>
                </>
              ) : (
                <>
                  <AlertCircle className="text-red-400" size={24} />
                  <div>
                    <p className="font-bold">اشتباه بود!</p>
                    {showAnswer && currentPlace && (
                      <p className="text-sm">پاسخ صحیح: {currentPlace.name}</p>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="hints" className="mt-0">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4 text-primary flex items-center rtl">
              <ChevronLeft className="text-primary" size={20} />
              <h1 className="">راهنماها:</h1>
            </h2>
            <div className="space-y-3">
              {showHint && currentPlace ? (
                <div className="flex flex-wrap flex-col justify-end gap-1">
                  {currentPlace.hints
                    .slice(0, hintIndex + 1)
                    .map((hint, index) => (
                      <motion.div
                        key={index}
                        className="rtl w-[95%] mr-auto  flex items-start gap-2 bg-border/50 border border-border p-3 rounded-lg text-sm font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="text-text">{hint}</div>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <Button
                  onClick={showNextHint}
                  variant="outline"
                  className="border-border text-text w-full shadow-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
                    className="border-border text-text w-full shadow-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    راهنمایی بیشتر
                  </Button>
                )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </motion.div>
);
