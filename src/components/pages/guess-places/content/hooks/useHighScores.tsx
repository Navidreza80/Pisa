import { useCallback, useEffect, useState } from "react";

// Custom hook to manage high scores with local storage
export const useHighScores = () => {
  const [highScores, setHighScores] = useState<{ name: string; score: number }[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Load high scores from local storage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem("highScores");
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  // Add a new high score, sort, and save to local storage
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