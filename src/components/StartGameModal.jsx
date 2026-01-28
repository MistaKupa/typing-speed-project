import { useState } from "react";
import { cn } from "../utils/cn";

export default function StartGameModal({ startGame }) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center text-preset3-semibold",
      )}
      onClick={startGame}
    >
      <div className="flex flex-col gap-250 items-center text-neutral-100">
        <button className="bg-blue-600 px-300 py-200 rounded-12 cursor-pointer hover:bg-blue-400 transition-all duration-300">
          Start Typing Test
        </button>
        <p>Or click the text and start typing</p>
      </div>
    </div>
  );
}
