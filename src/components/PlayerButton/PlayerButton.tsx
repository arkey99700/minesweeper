import style from "../../assets/css/app.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  GameStatus,
  GameStatuses,
  refreshGame,
} from "../../store/slices/gameSlice";
import { AppDispatch } from "../../store/store";
import { restartTimer } from "../../store/thunks/timerThunks";
import { createField } from "../../store/slices/minefieldSlice";

type Props = {
  gameStatus: GameStatus;
};

const GameStateEmojiMap: Record<GameStatus, string> = {
  [GameStatuses.InProgress]: "🙂",
  [GameStatuses.Paused]: "🙂",
  [GameStatuses.PendingReveal]: "😮",
  [GameStatuses.Waiting]: "😴",
  [GameStatuses.Won]: "😎",
  [GameStatuses.Lost]: "😵",
};

const PlayerButton = ({ gameStatus }: Props) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  function handleClick() {
    dispatch(refreshGame());
    dispatch(restartTimer());
    dispatch(createField({ height: 10, width: 10, mineCount: 10 }));
  }

  return (
    <div
      className={`${style.button} ${style["button--smile"]} ${
        active ? style.borderInset : style.borderOutset
      } ${style.greyHover}`}
      onClick={handleClick}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
    >
      {GameStateEmojiMap[gameStatus]}
    </div>
  );
};

export default PlayerButton;
