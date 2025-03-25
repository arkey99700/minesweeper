import style from '../../assets/css/app.module.scss';
import { useRef, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { startGame as startGameThunk } from '../../store/thunks/gameThunks';
import {
  DEFAULT_MINEFIELD_HEIGHT,
  DEFAULT_MINEFIELD_WIDTH,
  DEFAULT_MINE_COUNT,
  DIFFICULTY_EASY,
  DIFFICULTY_MEDIUM,
  DIFFICULTY_HARD,
  DIFFICULTY_CUSTOM,
  MAX_MINEFIELD_HEIGHT,
  MAX_MINEFIELD_WIDTH,
  MIN_MINE_COUNT,
} from '../../lib/constants';
import { MinefieldParameters } from '../../store/slices/minefieldSlice';

type Difficulty =
  | typeof DIFFICULTY_EASY
  | typeof DIFFICULTY_MEDIUM
  | typeof DIFFICULTY_HARD
  | typeof DIFFICULTY_CUSTOM;

const difficultyPresets: Record<
  Difficulty,
  MinefieldParameters & { name: string }
> = {
  [DIFFICULTY_EASY]: {
    width: 9,
    height: 9,
    mineCount: 10,
    name: 'Легкий',
  },
  [DIFFICULTY_MEDIUM]: {
    width: 16,
    height: 16,
    mineCount: 40,
    name: 'Средний',
  },
  [DIFFICULTY_HARD]: {
    width: 30,
    height: 16,
    mineCount: 99,
    name: 'Сложный',
  },
  [DIFFICULTY_CUSTOM]: {
    width: DEFAULT_MINEFIELD_HEIGHT,
    height: DEFAULT_MINEFIELD_WIDTH,
    mineCount: DEFAULT_MINE_COUNT,
    name: 'Настраиваемый',
  },
} as const;

export default function Options() {
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const minesInputRef = useRef<HTMLInputElement>(null);

  const [maxMineCount, setMaxMineCount] = useState(DEFAULT_MINE_COUNT);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>(DIFFICULTY_EASY);

  function changeMaxMineCount() {
    const maxMineCount =
      (Number(heightInputRef.current?.value) - 1) *
      (Number(widthInputRef.current?.value) - 1);

    setMaxMineCount(Math.max(maxMineCount, MIN_MINE_COUNT));
  }

  function startGame() {
    if (!formRef.current?.reportValidity()) {
      return;
    }

    dispatch(
      startGameThunk({
        width:
          selectedDifficulty === DIFFICULTY_CUSTOM
            ? Number(widthInputRef.current?.value)
            : difficultyPresets[selectedDifficulty].width,

        height:
          selectedDifficulty === DIFFICULTY_CUSTOM
            ? Number(heightInputRef.current?.value)
            : difficultyPresets[selectedDifficulty].height,

        mineCount:
          selectedDifficulty === DIFFICULTY_CUSTOM
            ? Number(minesInputRef.current?.value)
            : difficultyPresets[selectedDifficulty].mineCount,
      })
    );
  }

  return (
    <form className={`${style.options}`} ref={formRef}>
      <div className={`${style.option}`}>
        <span>Уровень сложности</span>
        <ul className={`${style.list}`}>
          {Object.entries(difficultyPresets).map(([difficulty, parameters]) => (
            <li key={difficulty}>
              <label className={`${style['option-group']}`}>
                <input
                  className={`${style['input--radio']}`}
                  type="radio"
                  name="difficulty"
                  value={difficulty}
                  onChange={(event) =>
                    setSelectedDifficulty(event.target.value as Difficulty)
                  }
                  checked={selectedDifficulty === difficulty}
                />
                <span
                  className={`${style.hinted}`}
                  title={`Поле ${parameters.width}×${parameters.height} и ${parameters.mineCount} мин`}
                >
                  {parameters.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {selectedDifficulty === DIFFICULTY_CUSTOM && (
        <div className={`${style.options}`}>
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
        </div>
      )}
      <button className={`${style.button}`} type="button" onClick={startGame}>
        Начать игру
      </button>
    </form>
  );
}
