import style from "./../../assets/css/app.module.css";

type Props = {
  count: number;
};

const Counter = ({ count }: Props) => {
  const counterNumber = String(count > 999 ? 999 : count).padStart(3, "0");

  return (
    <div className={`${style.counter} ${style.borderInset}`}>
      <span className={`${style.counterNumbers}`}>{counterNumber}</span>
    </div>
  );
};

export default Counter;
