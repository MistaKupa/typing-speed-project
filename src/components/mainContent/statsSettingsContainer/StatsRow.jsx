import { cn } from "../../../utils/cn";

export default function StatsRow({ WPM, timeLeft, accuracy }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timer = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return (
    <div className={cn("w-full h-full flex gap-250", "md:gap-300")}>
      <div
        className={cn(
          "w-full",
          "flex flex-col items-center gap-100",
          "md:w-auto md:flex-row md:gap-150",
        )}
      >
        <p
          className={cn(
            "text-preset3-regular-mobile text-neutral-400",
            "md:text-preset3-regular",
          )}
        >
          WPM:
        </p>
        <span className="text-preset2-bold text-neutral-100">{WPM}</span>
      </div>

      <span className="h-full bg-neutral-700 w-px"></span>

      <div
        className={cn(
          "w-full",
          "flex flex-col items-center gap-100",
          "md:w-auto md:flex-row md:gap-150",
        )}
      >
        <p
          className={cn(
            "text-preset3-regular-mobile text-neutral-400",
            "md:text-preset3-regular",
          )}
        >
          Accuracy:
        </p>
        <span className="text-preset2-bold text-red-500">{accuracy}%</span>
      </div>

      <span className="h-full bg-neutral-700 w-px"></span>

      <div
        className={cn(
          "w-full",
          "flex flex-col items-center gap-100",
          "md:w-auto md:flex-row md:gap-150",
        )}
      >
        <p
          className={cn(
            "text-preset3-regular-mobile text-neutral-400",
            "md:text-preset3-regular",
          )}
        >
          Time:
        </p>
        <span className=" text-preset2-bold text-yellow-500">{timer}</span>
      </div>
    </div>
  );
}
