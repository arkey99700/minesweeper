import style from '../../assets/css/app.module.css';
import { useRef, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { startGame as startGameThunk } from '../../store/thunks/gameThunks';
import {
  DEFAULT_MINEFIELD_HEIGHT,
  DEFAULT_MINEFIELD_WIDTH,
  DEFAULT_MINE_COUNT,
  MAX_MINEFIELD_HEIGHT,
  MAX_MINEFIELD_WIDTH,
  MIN_MINE_COUNT,
} from '../../lib/constants';

export default function Options() {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const minesInputRef = useRef<HTMLInputElement>(null);
  const [maxMineCount, setMaxMineCount] = useState(DEFAULT_MINE_COUNT);

  function changeMaxMineCount() {
    const maxMineCount = Math.floor(
      (Number(heightInputRef.current?.value) +
        Number(widthInputRef.current?.value)) /
        2
    );

    setMaxMineCount(Math.max(maxMineCount, MIN_MINE_COUNT));
  }

  function startGame() {
    if (formRef.current?.reportValidity()) {
      dispatch(
        startGameThunk({
          width: Number(widthInputRef.current?.value),
          height: Number(heightInputRef.current?.value),
          mineCount: Number(minesInputRef.current?.value),
        })
      );
    }
  }

  return (
    <form className={`${style.options}`} ref={formRef}>
      <label className={`${style.option}`}>
        <span>Высота поля</span>
        <input
          className={`${style.input} ${style.borderInset}`}
          ref={heightInputRef}
          type="number"
          defaultValue={DEFAULT_MINEFIELD_HEIGHT}
          max={MAX_MINEFIELD_HEIGHT}
          min={DEFAULT_MINEFIELD_HEIGHT}
          placeholder={`макс. ${MAX_MINEFIELD_HEIGHT}`}
          onChange={changeMaxMineCount}
          required
        />
      </label>
      <label className={`${style.option}`}>
        <span>Ширина поля</span>
        <input
          className={`${style.input} ${style.borderInset}`}
          ref={widthInputRef}
          type="number"
          defaultValue={DEFAULT_MINEFIELD_WIDTH}
          max={MAX_MINEFIELD_WIDTH}
          min={DEFAULT_MINEFIELD_WIDTH}
          placeholder={`макс. ${MAX_MINEFIELD_WIDTH}`}
          onChange={changeMaxMineCount}
          required
        />
      </label>
      <label className={`${style.option}`}>
        <span>Количество мин</span>
        <input
          className={`${style.input} ${style.borderInset}`}
          ref={minesInputRef}
          type="number"
          defaultValue={DEFAULT_MINE_COUNT}
          max={maxMineCount}
          min={MIN_MINE_COUNT}
          placeholder={`макс. ${maxMineCount}`}
          required
        />
      </label>
      <button
        className={`${style.grey} ${style.borderOutset}`}
        type="button"
        onClick={startGame}
      >
        Начать игру
      </button>
    </form>
  );
}
