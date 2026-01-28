import { cn } from "../../../utils/cn";
import SettingsContainer from "./settingsContainer/SettingsContainer";
import StatsRow from "./StatsRow";

export default function StatsSettingsContainer({ children }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-200 pb-200",
        "border-b border-b-neutral-700",
        "xl:flex-row xl:justify-between",
      )}
    >
      {children}
    </div>
  );
}
