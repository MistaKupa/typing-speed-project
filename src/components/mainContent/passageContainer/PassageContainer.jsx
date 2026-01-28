import { useState } from "react";
import data from "../../../../data.json";
import StartGameModal from "../../StartGameModal";
import { cn } from "../../../utils/cn";

export default function PassageContainer({
  gameStatus,
  passage,
  startGame,
  userInput,
}) {
  return (
    <div
      className={cn("relative flex-1 min-h-0 overflow-y-auto", "lg:min-h-135")}
    >
      {gameStatus === "START_GAME" && (
        <div className="absolute inset-0 z-10">
          <StartGameModal startGame={startGame} />
        </div>
      )}
      <p
        className={cn(
          "text-preset1-regular-mobile",
          "lg:text-preset1-regular",
          gameStatus !== "PLAYING" && "blur-sm",
        )}
      >
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
  );
}
