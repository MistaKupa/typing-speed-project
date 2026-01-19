export default function Results({
  wordsPerMinute,
  accuracy,
  characters,
  handleStartGame,
}) {
  const { correctLetter, incorrectLetter } = characters;

  return (
    <div className="relative w-full flex flex-col items-center gap-400 ">
      {/*SHAPES*/}
      <img
        src="/images/pattern-star-1.svg"
        className="absolute bottom-8 right-0"
      />
      <img
        src="/images/pattern-star-2.svg"
        className="absolute inset-5 top-23 -left-1 "
      />

      {/*CHECK MARK*/}
      <div className="relative flex justify-center items-center">
        <img src="/images/icon-completed.svg" className="relative z-20" />
        <div className="absolute w-24 h-24 rounded-full bg-green-500/25 "></div>
        <div className="absolute w-32 h-32 rounded-full bg-green-500/15 "></div>
      </div>

      {/*TEXT*/}
      <div className="flex flex-col items-center gap-125 pt-300 w-full">
        <h1 className="text-neutral-100 text-preset1-bold">Test Complete!</h1>
        <p className="text-neutral-400 text-preset3-regular">
          Solid run. Keep pushing to beat your high score.
        </p>
      </div>

      {/*STATS*/}
      <div className="w-full grid grid-cols-[10rem_10rem_10rem] justify-center gap-250 pt-250 pb-400">
        <div className="flex flex-col items-start gap-150 border border-neutral-700 rounded-8 px-300 py-200">
          <p className="text-preset3-regular text-neutral-400">WPM:</p>
          <span className="text-preset2-bold text-neutral-100">
            {wordsPerMinute}
          </span>
        </div>
        <div className="flex flex-col items-start gap-150 border border-neutral-700 rounded-8 px-300 py-200">
          <p className="text-preset3-regular text-neutral-400">Accuracy:</p>
          <span className="text-preset2-bold text-red-500">{accuracy}%</span>
        </div>
        <div className="flex flex-col items-start gap-150 border border-neutral-700 rounded-8 px-300 py-200">
          <p className="text-preset3-regular text-neutral-400">Characters:</p>
          <span className="text-preset2-bold text-neutral-500">
            <span className="text-green-500">{correctLetter}</span>
            {"/"}
            <span className="text-red-500">{incorrectLetter}</span>
          </span>
        </div>
      </div>

      {/*AGAIN BUTTON*/}
      <button
        onClick={handleStartGame}
        className="flex items-center justify-center gap-125 bg-neutral-100 text-neutral-900 text-preset3-semibold p-200 rounded-12 cursor-pointer"
      >
        Go Again
        <img className="invert" src="/images/icon-restart.svg" />
      </button>
    </div>
  );
}
