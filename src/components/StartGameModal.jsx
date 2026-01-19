export default function StartGameModal({ startGame }) {
  return (
    <div
      className="flex items-center justify-center min-h-[38.7rem] text-preset3-semibold  text-neutral-100 cursor-pointer"
      onClick={startGame}
    >
      <div className="flex flex-col gap-250 items-center ">
        <button className="bg-blue-600 px-300 py-200 rounded-12 cursor-pointer hover:bg-blue-400 transition-all duration-300">
          Start Typing Test
        </button>
        <p>Or click the text and start typing</p>
      </div>
    </div>
  );
}
