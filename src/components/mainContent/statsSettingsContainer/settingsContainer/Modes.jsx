import { useState } from "react";
import RadioButtons from "../../../../UI/RadioButtons";
import { cn } from "../../../../utils/cn";

const MODES = ["Timed (60s)", "Passage"];

export default function Modes({ current, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* MODE CONTAINER MOBILE */}
      <div className="relative w-full text-neutral-100  md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-125 py-75 border border-neutral-500 rounded-8 text-preset5-regular"
        >
          <span className="flex justify-center gap-125">
            {current} <img src="/images/icon-down-arrow.svg" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute w-full top-10 left-0 z-50">
            <RadioButtons />
          </div>
        )}
      </div>

      {/* MODE CONTAINER TABLET-DESKTOP */}
      <div
        className={cn(
          "hidden",
          "md:flex items-center gap-75",
          "text-preset5-regular",
        )}
      >
        <p className="text-neutral-400 pr-100">Mode:</p>
        {MODES.map((mode) => (
          <button
            key={mode}
            onClick={() => {
              onSelect(mode);
            }}
            className={cn(
              "px-125 py-75",
              "border border-neutral-500 rounded-8",
              "text-neutral-100 cursor-pointer",
              "hover:text-blue-400 hover:border-blue-400",
              "transition-all duration-300",
              {
                "text-blue-400 border-blue-400": current === mode,
              },
            )}
          >
            {mode}
          </button>
        ))}
      </div>
    </>
  );
}
