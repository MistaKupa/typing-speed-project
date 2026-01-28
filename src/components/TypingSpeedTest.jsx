import { useCallback, useEffect, useRef, useState } from "react";
import data from "../../data.json";
import StartGameModal from "./StartGameModal";
import Results from "./Results";
import Header from "./Header";
import MainContent from "./mainContent/MainContent";
import { cn } from "../utils/cn";

const DEFAULT_DIFFICULTY = "Easy";
const GAME_STATUSES = ["START_GAME", "PLAYING", "FINISHED"];

export default function TypingSpeedTest() {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState(DEFAULT_DIFFICULTY);
  const [selectedMode, setSelectedMode] = useState("Timed (60s)");

  const [passage, setPassage] = useState(() => {
    const passages = data[DEFAULT_DIFFICULTY.toLowerCase()];
    const randomIndex = Math.floor(Math.random() * passages.length);
    return passages[randomIndex].text.split("");
  });

  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  const [stats, setStats] = useState({ correctLetter: 0, incorrectLetter: 0 });

  const [gameStatus, setGameStatus] = useState("START_GAME");

  const [pb, setPb] = useState(Number(localStorage.getItem("PB")) || 0);

  const statsRef = useRef(stats);
  const timeLeftRef = useRef(timeLeft);

  const totalTyped = stats.correctLetter + stats.incorrectLetter;
  const accuracy =
    totalTyped > 0 ? Math.round((stats.correctLetter / totalTyped) * 100) : 0;

  const timePassed = (60 - timeLeft) / 60;
  const wordsPerMinute =
    timePassed > 0 ? Math.floor(Math.round(totalTyped / 5) / timePassed) : 0;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timer = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  // const handleStartGame = () => {
  //   setStats({ correctLetter: 0, incorrectLetter: 0 });
  //   setUserInput([]);
  //   setTimeLeft(60);
  //   setGameStatus("PLAYING");
  // };

  // const handleFinishGame = useCallback((finalWPM) => {
  //   setGameStatus("FINISHED");

  //   let savedPB = Number(localStorage.getItem("PB")) || 0;

  //   if (finalWPM > savedPB) {
  //     localStorage.setItem("PB", finalWPM.toString());
  //     setPb(finalWPM);
  //   }
  // }, []);

  // const handleDifficultyChange = (difficulty) => {
  //   setSelectedDifficulty(difficulty);

  //   const currentDifficulty = difficulty.toLowerCase();

  //   const passages = data[currentDifficulty];

  //   if (passages?.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * passages.length);

  //     const passageArray = passages[randomIndex].text.split("");
  //     setPassage(passageArray);
  //     setUserInput("");
  //     setStats({ correctLetter: 0, incorrectLetter: 0 });
  //     setTimeLeft(60);
  //   }
  // };

  // const handleKeyDown = useCallback(
  //   (event) => {
  //     if (
  //       (timeLeftRef.current === 0 && selectedMode === "Timed (60s)") ||
  //       gameStatus === "FINISHED"
  //     ) {
  //       return;
  //     }

  //     event.preventDefault();
  //     const { key } = event;

  //     if (gameStatus !== "PLAYING") {
  //       handleStartGame();
  //     }

  //     if (passage.length === 0) return;

  //     if (key.length !== 1 && key !== "Backspace") return;

  //     const currentStats = statsRef.current;
  //     const currentTimeLeft = timeLeftRef.current;

  //     if (key === "Backspace") {
  //       setUserInput((prev) => prev.slice(0, -1));
  //       return;
  //     }

  //     // if (userInput.length >= passage.length) return;

  //     // const currentLetter = passage[userInput.length];
  //     // const isCorrect = key === currentLetter;

  //     // if (isCorrect) {
  //     //   setStats((prev) => ({
  //     //     ...prev,
  //     //     correctLetter: prev.correctLetter + 1,
  //     //   }));
  //     // }
  //     // if (!isCorrect) {
  //     //   setStats((prev) => ({
  //     //     ...prev,
  //     //     incorrectLetter: prev.incorrectLetter + 1,
  //     //   }));
  //     // }

  //     const isCorrect = key === passage[userInput.length];
  //     const newStats = {
  //       correctLetter: isCorrect
  //         ? currentStats.correctLetter + 1
  //         : currentStats.correctLetter,
  //       incorrectLetter: !isCorrect
  //         ? currentStats.incorrectLetter + 1
  //         : currentStats.incorrectLetter,
  //     };

  //     setStats(newStats);

  //     setUserInput((prev) => {
  //       const nextInput = prev + key;

  //       if (nextInput.length >= passage.length) {
  //         const total = newStats.correctLetter + newStats.incorrectLetter;
  //         const timePassed = (60 - currentTimeLeft) / 60;
  //         const finalWPM = Math.floor(Math.round(total / 5) / timePassed);
  //         handleFinishGame(finalWPM);
  //       }
  //       return nextInput;
  //     });
  //   },
  //   [passage, gameStatus, handleFinishGame, selectedMode, userInput.length],
  // );

  // useEffect(() => {
  //   statsRef.current = stats;
  // }, [stats]);

  // useEffect(() => {
  //   timeLeftRef.current = timeLeft;
  // }, [timeLeft]);

  // useEffect(() => {
  //   if (selectedMode !== "Timed (60s)" || gameStatus !== "PLAYING") return;

  //   if (timeLeft === 0) {
  //     handleFinishGame();
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     setTimeLeft((prev) => prev - 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [gameStatus, timeLeft, selectedMode]);

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [handleKeyDown]);

  const isNewPB = gameStatus === "FINISHED" && wordsPerMinute >= pb;

  return (
    <main
      className={cn(
        "relative mx-auto bg-neutral-900 ",
        "flex flex-col gap-400",

        "w-container-width-mobile h-container-height-mobile",
        "px-200 pt-200 pb-400",

        "md:w-container-width-tablet md:h-container-height-tablet",
        "md:px-400 md:pt-400 md:pb-500 md:gap-500",

        "xl:w-container-width-desktop xl:h-container-height-desktop",
        "xl:px-1400 xl:pt-400 xl:gap-800",
      )}
    >
      {/* HEADER */}
      <Header />

      <MainContent />

      {/*FOOTER CONTAINER*/}
      {gameStatus === "PLAYING" && (
        <footer className="flex justify-center border-t border-t-neutral-700 pt-400">
          <button className="flex gap-125 bg-neutral-800 text-neutral-100 text-preset3-semibold rounded-12 py-200 px-200">
            Restart Test <img src="/images/icon-restart.svg" />
          </button>
        </footer>
      )}
    </main>
  );
}
