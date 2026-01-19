import { useCallback, useEffect, useState } from "react";
import data from "../../data.json";
import StartGameModal from "./StartGameModal";
import Results from "./Results";

const DEFAULT_DIFFICULTY = "Easy";
const GAME_STATUSES = ["START_GAME", "PLAYING", "FINISHED"];

export default function TypingSpeedTest() {
  const difficulties = ["Easy", "Medium", "Hard"];
  const modes = ["Timed (60s)", "Passage"];

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

  const totalTyped = stats.correctLetter + stats.incorrectLetter;
  const accuracy =
    totalTyped > 0 ? Math.round((stats.correctLetter / totalTyped) * 100) : 0;

  const timePassed = (60 - timeLeft) / 60;
  const wordsPerMinute =
    timePassed > 0 ? Math.floor(Math.round(totalTyped / 5) / timePassed) : 0;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timer = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  const handleStartGame = () => {
    setStats({ correctLetter: 0, incorrectLetter: 0 });
    setUserInput([]);
    setTimeLeft(60);
    setGameStatus("PLAYING");
  };

  const handleFinishGame = () => {
    setGameStatus("FINISHED");
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);

    const currentDifficulty = difficulty.toLowerCase();

    const passages = data[currentDifficulty];

    if (passages?.length > 0) {
      const randomIndex = Math.floor(Math.random() * passages.length);

      const passageArray = passages[randomIndex].text.split("");
      setPassage(passageArray);
      setUserInput("");
      setStats({ correctLetter: 0, incorrectLetter: 0 });
      setTimeLeft(60);
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (
        (timeLeft === 0 && selectedMode === "Timed (60s)") ||
        gameStatus === "FINISHED"
      ) {
        return;
      }

      event.preventDefault();
      const { key } = event;

      if (gameStatus !== "PLAYING") {
        handleStartGame();
      }

      if (passage.length === 0) return;

      if (key.length !== 1 && key !== "Backspace") return;

      if (key === "Backspace") {
        setUserInput((prev) => prev.slice(0, -1));
        return;
      }

      // if (userInput.length >= passage.length) return;

      // const currentLetter = passage[userInput.length];
      // const isCorrect = key === currentLetter;

      // if (isCorrect) {
      //   setStats((prev) => ({
      //     ...prev,
      //     correctLetter: prev.correctLetter + 1,
      //   }));
      // }
      // if (!isCorrect) {
      //   setStats((prev) => ({
      //     ...prev,
      //     incorrectLetter: prev.incorrectLetter + 1,
      //   }));
      // }

      setUserInput((prev) => {
        if (prev.length >= passage.length - 1) {
          handleFinishGame();
          return;
        }

        const currentLetter = passage[prev.length];
        const isCorrect = key === currentLetter;

        setStats((prevStats) => {
          if (isCorrect) {
            return { ...prevStats, correctLetter: prevStats.correctLetter + 1 };
          }

          if (!isCorrect) {
            return {
              ...prevStats,
              incorrectLetter: prevStats.incorrectLetter + 1,
            };
          }
        });

        return prev + key;
      });
    },
    [passage, gameStatus, timeLeft, selectedMode]
  );

  useEffect(() => {
    if (selectedMode !== "Timed (60s)" || gameStatus !== "PLAYING") return;

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
  }, [gameStatus, timeLeft, selectedMode]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <main className="mx-auto w-container-width-mobile h-container-height-mobile md:w-container-width-tablet md:h-container-height-tablet xl:w-container-width-desktop xl:h-container-height-desktop bg-neutral-900 flex flex-col gap-800 px-1400 py-400">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="">
          <img src="/images/logo-large.svg" alt="Typing Speed Test Logo" />
        </div>
        <div className="flex text-preset4-regular gap-125">
          <img
            className=""
            src="/images/icon-personal-best.svg"
            alt="Personal Best Icon"
          />
          <div className="">
            <p className="text-neutral-400">
              Personal best: <span className="text-neutral-100">92 WPM</span>
            </p>
          </div>
        </div>
      </div>

      {/*FINISHED RESULTS*/}
      {gameStatus === "FINISHED" ? (
        <Results
          wordsPerMinute={wordsPerMinute}
          accuracy={accuracy}
          characters={stats}
          handleStartGame={handleStartGame}
        />
      ) : (
        <>
          {/* MAIN CONTENT */}
          <div className="w-full flex flex-col gap-400">
            {/* STATS / SETTINGS CONTAINER */}
            <div className="flex justify-between border-b border-b-neutral-700 pb-200">
              {/* STATS ROW */}
              <div className="flex items-center gap-300">
                <div className="flex gap-150 border-r border-r-neutral-700 pr-300">
                  <p className="text-neutral-400 text-preset3-regular">WPM:</p>
                  <span className="text-neutral-100 text-preset2-bold">
                    {wordsPerMinute}
                  </span>
                </div>

                <div className="flex gap-150 border-r border-r-neutral-700 pr-300">
                  <p className="text-neutral-400 text-preset3-regular">
                    Accuracy:
                  </p>
                  <span className="text-red-500 text-preset2-bold">
                    {accuracy}%
                  </span>
                </div>

                <div className="flex gap-150">
                  <p className="text-neutral-400 text-preset3-regular">Time:</p>
                  <span className="text-yellow-500 text-preset2-bold">
                    {timer}
                  </span>
                </div>
              </div>

              {/* SETTINGS CONTAINER */}
              <div className="flex gap-200 text-neutral-100 text-preset5-regular">
                {/* DIFFICULTY CONTAINER */}
                <div className="flex items-center gap-75 border-r border-r-neutral-700 pr-200">
                  <p className="text-neutral-400">Difficulty:</p>

                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      className={`${
                        selectedDifficulty === difficulty
                          ? "border-blue-400 text-blue-400"
                          : "border-neutral-500"
                      } border rounded-8 px-125 py-75 cursor-pointer hover:border-blue-400 hover:text-blue-400 transition-all duration-200`}
                      onClick={() => handleDifficultyChange(difficulty)}
                    >
                      {difficulty}
                    </button>
                  ))}

                  {/* <button className="border border-blue-400 rounded-8 text-blue-400 px-125 py-75">
                Hard
              </button> */}
                </div>

                {/* MODE CONTAINER */}
                <div className="flex items-center gap-75">
                  <p className="text-neutral-400">Mode:</p>
                  {modes.map((mode) => (
                    <button
                      key={mode}
                      className={`${
                        selectedMode === mode
                          ? "border-blue-400 text-blue-400"
                          : "border-neutral-500"
                      } border px-125 py-75 rounded-8 hover:border-blue-400 hover:text-blue-400 transition-all duration-200 cursor-pointer`}
                      onClick={() => {
                        setSelectedMode(mode);
                      }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/*TEXT CONTAINER*/}
            <div className="relative min-h-[38.7rem] text-preset1-regular">
              {gameStatus === "START_GAME" && (
                <div className="absolute inset-0 z-10">
                  <StartGameModal startGame={handleStartGame} />
                </div>
              )}
              <p className={`${gameStatus !== "PLAYING" ? "blur-sm" : ""}`}>
                {passage.map((letter, i) => {
                  let colorClass = "text-neutral-400";

                  if (i < userInput.length) {
                    colorClass =
                      userInput[i] === letter
                        ? "text-green-500"
                        : "text-red-500 underline";
                  }
                  return (
                    <span key={i} className={colorClass}>
                      {letter}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </>
      )}

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
