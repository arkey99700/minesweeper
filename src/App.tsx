import style from './assets/css/app.module.css';
import { useSelector } from 'react-redux';
import PlayerButton from './components/PlayerButton/PlayerButton';
import Field from './components/Field/Field';
import Counter from './components/Counter/Counter';
import Modal from './components/Modal/Modal';
import Options from './components/Options/Options';
import { AppState } from './store/store';

function App() {
  const { status, settingsDispayed } = useSelector(
    (state: AppState) => state.game
  );
  const { grid, flagCount } = useSelector((state: AppState) => state.minefield);
  const { time } = useSelector((state: AppState) => state.timer);

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
      <Modal open={settingsDispayed}>
        <Options></Options>
      </Modal>
    </>
  );
}

export default App;
