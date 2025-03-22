import style from './../../assets/css/app.module.css';

interface Props {
  count: number;
}

const MAX_COUNTER_NUMBER = 999;

const Counter = ({ count }: Props) => {
  const counterNumber = String(
    count > MAX_COUNTER_NUMBER ? MAX_COUNTER_NUMBER : count
  ).padStart(3, '0');

  return (
    <div className={`${style.counter} ${style.borderInset}`}>
      <span className={`${style.counterNumbers}`}>{counterNumber}</span>
    </div>
  );
};

export default Counter;
