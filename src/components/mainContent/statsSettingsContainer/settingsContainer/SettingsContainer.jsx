import Difficulties from "./Difficulties";
import Modes from "./Modes";

export default function SettingsContainer({ children }) {
  return (
    <div className="w-full h-full flex gap-200 text-neutral-100 text-preset5-regular">
      {children}
    </div>
  );
}
