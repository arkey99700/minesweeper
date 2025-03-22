import { useRef, useState } from "react";
import style from "../../assets/css/app.module.css";

const Options = () => {
  const heightInputRef = useRef<HTMLInputElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const minesInputRef = useRef<HTMLInputElement>(null);
  const [maxMineCount, setMaxMineCount] = useState(1);

  function changeMaxMineCount() {
    let mineCount = Math.floor(
      (Number(heightInputRef.current!.value) +
        Number(widthInputRef.current!.value)) /
        2
    );

    setMaxMineCount(mineCount || 1);
  }

  return (
    <form className={`${style.options}`}>
      <label className={`${style.option}`}>
        <span>Высота поля</span>
        <input
          ref={heightInputRef}
          type="number"
          max={99}
          min={3}
          placeholder="макс. 99"
          onChange={changeMaxMineCount}
          required
        />
      </label>
      <label className={`${style.option}`}>
        <span>Ширина поля</span>
        <input
          ref={widthInputRef}
          type="number"
          max={99}
          min={3}
          placeholder="макс. 99"
          onChange={changeMaxMineCount}
          required
        />
      </label>
      <label className={`${style.option}`}>
        <span>Количество мин</span>
        <input
          ref={minesInputRef}
          type="number"
          max={maxMineCount}
          min={1}
          placeholder={`макс. ${maxMineCount}`}
          required
        />
      </label>
      <button className={`${style.grey} ${style.borderOutset}`}>
        Начать игру
      </button>
    </form>
  );
};

export default Options;
