import style from '../../assets/css/app.module.scss';
import { GameStatus, GameStatuses } from '../../store/slices/gameSlice';
import { AppDispatch, useAppDispatch } from '../../store/store';
import { restartGame } from '../../store/thunks/gameThunks';

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
  const dispatch = useAppDispatch<AppDispatch>();

  function handleClick() {
    dispatch(restartGame());
  }

  return (
    <div
      className={`${style.button} ${style['button--smile']}`}
      onClick={handleClick}
    >
      {GameStateEmojis[gameStatus]}
    </div>
  );
}
