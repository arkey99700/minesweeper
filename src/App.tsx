import style from './assets/css/app.module.scss';
import PlayerButton from './components/PlayerButton/PlayerButton';
import Field from './components/Field/Field';
import Counter from './components/Counter/Counter';
import Modal from './components/Modal/Modal';
import Options from './components/Options/Options';
import { useAppSelector } from './store/store';

function App() {
  const { status, settingsDispayed } = useAppSelector((state) => state.game);
  const { grid, flagCount } = useAppSelector((state) => state.minefield);
  const { time } = useAppSelector((state) => state.timer);

  return (
    <>
      <div
        className={`${style.grey} ${style.center} ${style.borderOutset} ${style.container} ${style.fitContent}`}
      >
        <div className={`${style.w100} ${style.row}`}>
          <Counter count={flagCount}></Counter>
          <PlayerButton gameStatus={status}></PlayerButton>
          <Counter count={time}></Counter>
        </div>
        <div>
          <Field minefield={grid}></Field>
        </div>
      </div>
      <Modal isOpen={settingsDispayed}>
        <Options></Options>
      </Modal>
    </>
  );
}

export default App;
