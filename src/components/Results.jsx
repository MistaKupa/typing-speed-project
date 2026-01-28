export default function Results({
  wordsPerMinute,
  accuracy,
  characters,
  handleStartGame,
  isNewPB,
}) {
  const { correctLetter, incorrectLetter } = characters;

  return (
    <>
      {isNewPB && (
        <img
          src="/images/pattern-confetti.svg"
          alt="Personal Best Confetti"
          className="absolute bottom-0 left-0"
        />
      )}

      <div className="relative w-full flex flex-col items-center gap-400 ">
        {/*SHAPES*/}
        {!isNewPB && (
          <>
            <img
              src="/images/pattern-star-1.svg"
              alt="Yellow Star Shape"
              className="absolute bottom-8 right-0"
            />
            <img
              src="/images/pattern-star-2.svg"
              alt="Red Star Shape"
              className="absolute inset-5 top-23 -left-1 "
            />
          </>
        )}

        {/*CHECK MARK*/}
        <div className="relative flex justify-center items-center">
          {isNewPB ? (
            <img
              src="/images/icon-new-pb.svg"
              alt="Result Icon"
              className="relative"
            />
          ) : (
            <>
              <img
                src="/images/icon-completed.svg"
                alt="Result Icon"
                className="relative z-20"
              />
              <div className="absolute w-24 h-24 rounded-full bg-green-500/25 "></div>
              <div className="absolute w-32 h-32 rounded-full bg-green-500/15 "></div>
            </>
          )}
        </div>

        {/*TEXT*/}
        <div className="flex flex-col items-center gap-125 pt-300 w-full">
          <h1 className="text-neutral-100 text-preset1-bold">
            {isNewPB ? "High Score Smashed!" : "Test Complete!"}
          </h1>
          <p className="text-neutral-400 text-preset3-regular">
            {isNewPB
              ? "You re getting faster. That was incredible typing"
              : "Solid run. Keep pushing to beat your high score."}
          </p>
        </div>

        {/* STATS */}
        {/* WPM */}
        <div className="w-full grid grid-cols-[10rem_10rem_10rem] justify-center gap-250 pt-250 pb-400">
          <div className="flex flex-col items-start gap-150 border border-neutral-700 rounded-8 px-300 py-200">
            <p className="text-preset3-regular text-neutral-400">WPM:</p>
            <span className="text-preset2-bold text-neutral-100">
              {wordsPerMinute}
            </span>
          </div>

          {/* ACCURACY */}
          <div className="flex flex-col items-start gap-150 border border-neutral-700 rounded-8 px-300 py-200">
            <p className="text-preset3-regular text-neutral-400">Accuracy:</p>
            <span className="text-preset2-bold text-red-500">{accuracy}%</span>
          </div>

          {/* CORRECT / INCORRECT */}
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
          {isNewPB ? "Beat This Score" : "Go Again"}
          <img className="invert" src="/images/icon-restart.svg" />
        </button>
      </div>
    </>
  );
}
