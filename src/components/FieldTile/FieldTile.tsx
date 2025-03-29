import style from '../../assets/css/app.module.scss';
import { memo, MouseEvent, useState } from 'react';
import { flagTile, unflagTile } from '../../store/slices/minefieldSlice';
import { useAppDispatch, useAppStore } from '../../store/store';
import { GameStatuses, setStatus } from '../../store/slices/gameSlice';
import { checkTile } from '../../store/thunks/minefieldThunks';
import { startTimer } from '../../store/thunks/timerThunks';

type Props = {
  isRevealed: boolean;
  isMined: boolean;
  isFlagged: boolean;
  number: number;
  x: number;
  y: number;
};

function FieldTile({ isRevealed, isMined, isFlagged, number, x, y }: Props) {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  function handleMouseDown(event: MouseEvent) {
    if (isRevealed || store.getState().game.status === GameStatuses.Lost) {
      return;
    }

    if (event.button === 2) {
      if (isFlagged) {
        dispatch(unflagTile({ x, y }));
      } else {
        dispatch(flagTile({ x, y }));
      }
    } else {
      if (isFlagged) {
        return;
      }

      setActive(true);
      dispatch(setStatus(GameStatuses.PendingReveal));
    }
  }

  function handleMouseUp(event: MouseEvent) {
    const status = store.getState().game.status;

    if (status === GameStatuses.Lost) {
      return;
    }

    if (isRevealed) {
      if (status === GameStatuses.PendingReveal) {
        dispatch(setStatus(GameStatuses.InProgress));
      }

      return;
    }

    dispatch(startTimer());

    if (event.button === 0) {
      if (isFlagged) {
        return;
      }

      setActive(false);
      dispatch(setStatus(GameStatuses.InProgress));

      if (!isRevealed) {
        dispatch(checkTile({ x, y }));
      }
    }
  }

  function handleMouseOver(event: MouseEvent) {
    if (event.button === 0 && event.buttons > 0) {
      setActive(true);
    }
  }

  function handleMouseOut(event: MouseEvent) {
    if (active) {
      setActive(false);

      if (
        store.getState().game.status === GameStatuses.PendingReveal &&
        (!event.relatedTarget ||
          !(event.relatedTarget as HTMLElement).closest(`.${style.tile}`))
      ) {
        dispatch(setStatus(GameStatuses.InProgress));
      }
    }
  }

  function getTileContent(): string | number {
    if (isMined && isRevealed) {
      return '💣';
    }

    if (isFlagged && !isRevealed) {
      return '🚩';
    }

    if (!isRevealed) {
      return '';
    }

    return number || '';
  }

  const [active, setActive] = useState(false);

  return (
    <div
      className={`
      ${isRevealed ? style.borderInsetSmall : style.borderOutsetSmall} 
      ${isRevealed ? style.lightGrey : style.grey} 
      ${number && !isMined ? style['tile--' + number] : ''} 
      ${style.tile} ${style.greyHover} 
      ${
        active
          ? style.borderInsetSmall + ' ' + style.lightGrey
          : style.borderOutsetSmall + ' ' + style.grey
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onContextMenu={(event: React.MouseEvent<HTMLDivElement>) =>
        event.preventDefault()
      }
    >
      {getTileContent()}
    </div>
  );
}

export default memo(FieldTile);
