import { Button } from "@/components/ui/button";
import { Clock, Shuffle, Zap } from "lucide-react";
import { Difficulty } from "../types";
import { GAME_MODES } from "../utils/constants";
import { useTranslations } from 'next-intl';

function GameModeAndDifficulty({ setDifficulty, difficulty, startGame }) {
  const t = useTranslations('guessPlace');

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-between">
      {/* Game Modes */}
      <div className="grid grid-cols-1">
        {[
          {
            mode: GAME_MODES.NORMAL,
            icon: <Zap className="!w-6 !h-6" />,
            titleKey: "modes.normal.title",
            descKey: "modes.normal.description",
            bg: "bg-primary/90",
          },
          {
            mode: GAME_MODES.TIME_ATTACK,
            icon: <Clock className="!w-6 !h-6" />,
            titleKey: "modes.timeAttack.title",
            descKey: "modes.timeAttack.description",
            bg: "bg-text-secondary/90",
          },
          {
            mode: GAME_MODES.ENDLESS,
            icon: <Shuffle className="!w-6 !h-6" />,
            titleKey: "modes.endless.title",
            descKey: "modes.endless.description",
            bg: "bg-border/90 !text-text",
          },
        ].map(({ mode, icon, titleKey, descKey, bg }) => (
          <Button
            key={mode}
            onClick={() => startGame(mode)}
            className={`${bg} hover:${bg} shadow-none text-white font-bold text-lg py-8 cursor-pointer rounded-xl hover:scale-[1.03] transition-transform overflow-hidden`}
          >
            <div className="relative w-full flex items-center justify-end gap-3 text-right">
              <div>
                <span className="block text-lg">{t(titleKey)}</span>
                <span className="text-xs opacity-80">{t(descKey)}</span>
              </div>
              {icon}
            </div>
          </Button>
        ))}
      </div>

      {/* Difficulty Selection */}
      <div className="border border-border p-6 rounded-2xl min-w-[240px]">
        <h3 className="text-lg font-bold mb-2 flex items-center justify-center gap-2 text-primary">
          {t('difficulty.title')}
        </h3>

        <div className="flex flex-col flex-wrap gap-2 mt-5">
          {[
            {
              labelKey: "difficulty.easy",
              level: "easy",
              color: "bg-green-500",
              hover: "hover:bg-green-600",
            },
            {
              labelKey: "difficulty.medium",
              level: "medium",
              color: "bg-blue-500",
              hover: "hover:bg-blue-600",
            },
            {
              labelKey: "difficulty.hard",
              level: "hard",
              color: "bg-red-500",
              hover: "hover:bg-red-600",
            },
          ].map(({ labelKey, level, color, hover }) => (
            <Button
              key={level}
              onClick={() => setDifficulty(level as Difficulty)}
              variant={difficulty === level ? "default" : "outline"}
              className={
                difficulty === level
                  ? `${color} ${hover} text-white w-full cursor-pointer hover:scale-105`
                  : "border border-border text-text w-full shadow-none cursor-pointer hover:scale-105"
              }
            >
              {t(labelKey)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default GameModeAndDifficulty;