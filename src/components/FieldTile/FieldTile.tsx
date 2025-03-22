import style from '../../assets/css/app.module.css';
import { MouseEvent, useState } from 'react';
import { MinefieldTile } from '../../lib/minefield';
import { flagTile, unflagTile } from '../../store/slices/minefieldSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { GameStatuses, setStatus } from '../../store/slices/gameSlice';
import { checkTile } from '../../store/thunks/minefieldThunks';
import { startTimer } from '../../store/thunks/timerThunks';

interface Props {
  tile: MinefieldTile;
}

const FieldTile = ({ tile }: Props) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.game);
  const { timerId } = useAppSelector((state) => state.timer);

  function handleMouseDown(event: MouseEvent) {
    if (tile.isRevealed || status === GameStatuses.Lost) {
      return false;
    }

    if (event.button === 2) {
      if (tile.isFlagged) {
        dispatch(unflagTile(tile));
      } else {
        dispatch(flagTile(tile));
      }
    } else {
      setActive(true);
      dispatch(setStatus(GameStatuses.PendingReveal));
    }
  }

  function handleMouseUp(event: MouseEvent) {
    if (status === GameStatuses.Lost) return false;

    if (tile.isRevealed) {
      if (status === GameStatuses.PendingReveal) {
        return dispatch(setStatus(GameStatuses.InProgress));
      } else {
        return false;
      }
    }

    if (!timerId) {
      dispatch(startTimer());
    }

    if (event.button === 0) {
      if (tile.isFlagged) {
        return false;
      }

      setActive(false);
      dispatch(setStatus(GameStatuses.InProgress));

      if (!tile.isRevealed) {
        dispatch(checkTile(tile));
      }
    }
  }

  function handleMouseOut(event: MouseEvent) {
    if (active) {
      setActive(false);

      if (
        status === GameStatuses.PendingReveal &&
        (!event.relatedTarget ||
          !(event.relatedTarget as HTMLElement).closest(`.${style.tile}`))
      ) {
        console.log(event.relatedTarget);

        dispatch(setStatus(GameStatuses.InProgress));
      }
    }
  }

  function getTileContent(tile: MinefieldTile): string | number {
    if (tile.isMined && tile.isRevealed) {
      return '💣';
    }

    if (tile.isFlagged && !tile.isRevealed) {
      return '🚩';
    }

    if (!tile.isRevealed) {
      return '';
    }

    return tile.number || '';
  }

  const [active, setActive] = useState(false);

  return (
    <div
      className={`
      ${tile.isRevealed ? style.borderInsetSmall : style.borderOutsetSmall} 
      ${tile.isRevealed ? style.lightGrey : style.grey} 
      ${tile.number && !tile.isMined ? style['tile--' + tile.number] : ''} 
      ${style.tile} ${style.greyHover} 
      ${
        active
          ? style.borderInsetSmall + ' ' + style.lightGrey
          : style.borderOutsetSmall + ' ' + style.grey
      }`}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      onMouseDown={handleMouseDown}
      onMouseOver={(event: MouseEvent) => {
        if (event.button === 0 && event.buttons > 0) setActive(true);
      }}
      onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
        e.preventDefault()
      }
    >
      {getTileContent(tile)}
    </div>
  );
};

export default FieldTile;
