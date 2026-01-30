import { useCallback, useEffect, useState } from "react";
import data from "../data.json";

const DEFAULT_TIME = 60;

export function useGameLocig({
  defaultDifficulty = "Easy",
  defaultMode = "Timed (60s)",
}) {
  const [gameStatus, setGameStatus] = useState("START_GAME");

  const [selectedDifficulty, setSelectedDifficulty] =
    useState(defaultDifficulty);
  const [selectedMode, setSelectedMode] = useState(defaultMode);

  const [passage, setPassage] = useState(() => {
    const passages = data[defaultDifficulty.toLowerCase()];
    const randomID = Math.floor(Math.random() * passages.length);

    return passages[randomID].text.split("");
  });

  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);

  // const [userInput, setUserInput] = useState([]);
  // const [stats, setStats] = useState({
  //   correctLetter: 0,
  //   incorrectLetter: 0,
  //   totalTyped: 0,
  // });

  const [gameState, setGameState] = useState({
    userInput: [],
    stats: { correctLetter: 0, incorrectLetter: 0, totalTyped: 0 },
  });

  ///// ACCURACY CALCULATION /////
  const accuracy =
    gameState.stats.totalTyped > 0
      ? Math.round(
          (gameState.stats.correctLetter / gameState.stats.totalTyped) * 100,
        )
      : 0;

  ///// WPM CALCULATION /////
  const words = gameState.stats.totalTyped / 5;
  const timePassed = (DEFAULT_TIME - timeLeft) / 60;
  const WPM = timePassed > 0 ? Math.round(words / timePassed) : 0;

  const handleStartGame = useCallback(() => {
    setGameState({
      userInput: [],
      stats: { correctLetter: 0, incorrectLetter: 0, totalTyped: 0 },
    });

    if (selectedMode === "Timed (60s)") {
      setTimeLeft(60);
    }

    setGameStatus("PLAYING");
  }, [selectedMode]);

  const handleFinishGame = useCallback(() => {
    setGameStatus("FINISHED");

    const currentPB = Number(localStorage.getItem("PB")) || 0;

    if (WPM > currentPB) {
      localStorage.setItem("PB", WPM);
    }
  }, [WPM]);

  ///// DIFFICULTY CHANGE /////
  const handleChangeDifficulty = useCallback((newDifficulty) => {
    setSelectedDifficulty(newDifficulty);

    const currentDifficulty = newDifficulty.toLowerCase();
    const passages = data[currentDifficulty];

    if (passages.length > 0) {
      const randomIndex = Math.floor(Math.random() * passages.length);
      const passageArray = passages[randomIndex].text.split("");

      setPassage(passageArray);
      setGameState({
        userInput: [],
        stats: { correctLetter: 0, incorrectLetter: 0, totalTyped: 0 },
      });
      setTimeLeft(60);
    }
  }, []);

  ///// MODE CHANGE /////
  const handleModeChange = useCallback((newMode) => {
    setSelectedMode(newMode);
  }, []);

  ///// KEY PRESS LOGIC /////
  const handleKeyDown = useCallback(
    (e) => {
      const key = e.key;

      if (key !== "F12") {
        e.preventDefault();
      }

      if (gameStatus === "FINISHED") return;

      if (passage.length === 0) return;

      if (key.length !== 1 && key !== "Backspace") return;

      if (gameStatus === "START_GAME") {
        handleStartGame();
        return;
      }

      setGameState((prev) => {
        if (key === "Backspace") {
          return {
            ...prev,
            userInput: prev.userInput.slice(0, -1),
          };
        }

        const currentIndex = prev.userInput.length;
        const currentLetter = passage[currentIndex];
        const isCorrect = key === currentLetter;

        const nextInput = [...prev.userInput, key];

        if (nextInput.length >= passage.length) {
          setTimeout(handleFinishGame, 0);
        }

        return {
          userInput: nextInput,
          stats: {
            correctLetter: isCorrect
              ? prev.stats.correctLetter + 1
              : prev.stats.correctLetter,
            incorrectLetter: !isCorrect
              ? prev.stats.incorrectLetter + 1
              : prev.stats.incorrectLetter,
            totalTyped: prev.stats.totalTyped + 1,
          },
        };
      });
    },
    [gameStatus, passage, handleStartGame, handleFinishGame],
  );

  ///// TIMER /////
  useEffect(() => {
    if (selectedMode === "Passage" || gameStatus !== "PLAYING") return;

    if (timeLeft === 0) {
      handleFinishGame();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, selectedMode, gameStatus]);

  ///// KEYDOWN LISTENER /////
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    settings: {
      difficulty: selectedDifficulty,
      mode: selectedMode,
      time: timeLeft,
      gameStatus,
      passage,
    },
    actions: {
      handleChangeDifficulty,
      handleModeChange,
      handleStartGame,
      handleFinishGame,
    },
    game: {
      userInput: gameState.userInput,
      stats: gameState.stats,
      WPM,
      accuracy,
    },
  };
}
