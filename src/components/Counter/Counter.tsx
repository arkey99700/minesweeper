import style from './../../assets/css/app.module.css';

type Props = {
  count: number;
};

const MAX_COUNTER_NUMBER = 999;

export default function Counter({ count }: Props) {
  const counterValue = String(
    count > MAX_COUNTER_NUMBER ? MAX_COUNTER_NUMBER : count
  ).padStart(3, '0');

  return (
    <div className={`${style.counter} ${style.borderInset}`}>
      <span className={`${style.counterNumbers}`}>{counterValue}</span>
    </div>
  );
}
