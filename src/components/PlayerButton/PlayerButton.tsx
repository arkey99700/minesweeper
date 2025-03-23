import style from '../../assets/css/app.module.css';
import { useState } from 'react';
import {
  GameStatus,
  GameStatuses,
  refreshGame,
} from '../../store/slices/gameSlice';
import { AppDispatch, useAppDispatch } from '../../store/store';
import { restartTimer } from '../../store/thunks/timerThunks';
import { createMinefield } from '../../store/slices/minefieldSlice';

type Props = {
  gameStatus: GameStatus;
};

const GameStateEmojis: Record<GameStatus, string> = {
  [GameStatuses.InProgress]: '🙂',
  [GameStatuses.Paused]: '🙂',
  [GameStatuses.PendingReveal]: '😮',
  [GameStatuses.Waiting]: '😴',
  [GameStatuses.Won]: '😎',
  [GameStatuses.Lost]: '😵',
};

export default function PlayerButton({ gameStatus }: Props) {
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch<AppDispatch>();

  function handleClick() {
    dispatch(refreshGame());
    dispatch(restartTimer());
    dispatch(createMinefield({ height: 10, width: 10, mineCount: 10 }));
  }

  return (
    <div
      className={`${style.button} ${style['button--smile']} ${
        active ? style.borderInset : style.borderOutset
      } ${style.greyHover}`}
      onClick={handleClick}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
    >
      {GameStateEmojis[gameStatus]}
    </div>
  );
}
