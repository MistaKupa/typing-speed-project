import { useGameLocig } from "../../../hooks/useGameLocig";
import Results from "../Results";
import PassageContainer from "./passageContainer/PassageContainer";
import StatsRow from "./statsSettingsContainer/StatsRow";
import StatsSettingsContainer from "./statsSettingsContainer/StatsSettingsContainer";
import Difficulties from "./statsSettingsContainer/settingsContainer/Difficulties";
import Modes from "./statsSettingsContainer/settingsContainer/Modes";
import SettingsContainer from "./statsSettingsContainer/settingsContainer/SettingsContainer";

export default function MainContent() {
  const { settings, actions, game } = useGameLocig("Easy", "Timed (60s)");

  return (
    <div className="w-full h-full min-h-0 flex flex-col gap-400">
      {/*FINISHED RESULTS*/}
      {settings.gameStatus === "FINISHED" ? (
        <Results
          wordsPerMinute={game.WPM}
          accuracy={game.accuracy}
          characters={game.stats}
          isNewPB={true}
          handleStartGame={actions.handleStartGame}
        />
      ) : (
        <>
          <StatsSettingsContainer>
            <StatsRow
              WPM={game.WPM}
              accuracy={game.accuracy}
              timeLeft={settings.time}
            />
            <SettingsContainer>
              <Difficulties
                current={settings.difficulty}
                onSelect={actions.handleChangeDifficulty}
              />
              <span className="hidden md:inline h-full bg-neutral-700 w-px"></span>
              <Modes
                current={settings.mode}
                onSelect={actions.handleModeChange}
              />
            </SettingsContainer>
          </StatsSettingsContainer>
          <PassageContainer
            gameStatus={settings.gameStatus}
            passage={settings.passage}
            startGame={actions.handleStartGame}
            userInput={game.userInput}
          />
        </>
      )}
    </div>
  );
}
