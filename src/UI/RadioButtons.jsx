import { cn } from "../utils/cn";

export default function RadioButtons({ settings, onSelect }) {
  return (
    <div className="flex flex-col gap-100 py-125 bg-neutral-800 rounded-8">
      {settings.map((setting, i) => (
        <div
          key={setting}
          className="relative flex gap-150 px-150 border-b border-b-neutral-700 pb-100 last:border-0 last:pb-0"
        >
          {/* ID NAME VALUE MUSIA BYŤ V LOWE CASE NEZABUDNI */}
          <div
            className="relative w-4 h-4 flex items-center justify-center"
            onClick={() => onSelect(setting)}
          >
            <input
              type="radio"
              id={setting}
              name="setting"
              value={setting}
              className="peer
            appearance-none shrink-0
            absolute w-4 h-4 border border-neutral-100 rounded-full
            checked:border-0 checked:bg-blue-500
            focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-400"
            />
            <div
              className={cn(
                "absolute pointer-events-none",
                "w-2 h-2 rounded-full peer-checked:bg-neutral-900",
                "peer-checked:peer-disabled:bg-gray-400",
              )}
            />
          </div>
          <label htmlFor={setting} className="text-preset5-regular">
            {setting}
          </label>
        </div>
      ))}
    </div>
  );
}
