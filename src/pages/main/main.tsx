/* eslint-disable react/button-has-type */
import React, { useContext, useState, useEffect } from 'react';
import style from './main.module.scss';
import Card from './components/card';
import { BackendWordInterface } from '../../types';
import cardObj from '../../mosk/testCardObj';
import { StateContext } from '../../store/stateProvider';
import trainGameCard from './components/training';

const Main = () => {
  const { state, dispatch } = useContext(StateContext);
  const [cardObject, setCardObject] = useState<BackendWordInterface >(cardObj[0] as BackendWordInterface);
  const [startPreview, setStart] = useState(true);
  const [count, setCount] = useState(0);
  const [answer, setAns] = useState(false);
  const { wordsPerDay } = state.settings;

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const result = await (trainGameCard(state.auth.userId, state.auth.token));
      if (!ignore) setCardObject(result); console.log(result);
    }
    fetchData();
    return () => { ignore = true; };
  }, [count]);

  const {
    addGradeButton,
    addToDifficultWordsButton,
    exampleToCard,
    explainToCard,
    imageToCard,
    pronounceToCard,
    showAnswerButton,
    transcriptionToCard,
    translateToTheCard,
    wordDeleteButton
  } = state.settings.optional;

  const settings = {
    addGradeButton,
    addToDifficultWordsButton,
    exampleToCard,
    explainToCard,
    imageToCard,
    pronounceToCard,
    showAnswerButton,
    transcriptionToCard,
    translateToTheCard,
    wordDeleteButton
  };

  const handleNext = () => {
    if (answer === false) {
      setAns(true);
    } else {
      setAns(false);
      if ((count + 1) > wordsPerDay) {
        dispatch({ type: 'SET_TRAINING_COMPLETE', value: true });
        alert('End of training');
      } else setCount(count + 1);
    }
  };

  return (
    <>
      <div className={style.learnContainer}>
        {startPreview ? (
          <div className={style.startBasicGameContainer}>
            <h2>Тренировка</h2>
            <p>
              &#8195;Улучшай свои знания с помощью крутых и не скучных тренировок.
              По мере изучения языка у вас будут накапливаться слова на повторение.
              Так что не удивляйтесь, если слова будут иногда повторяться.
            </p>
            <button
              className={style.startLearnButton}
              onClick={() => { setStart(false); }}
            >
              Начать изучать
            </button>
          </div>
        ) : (
          <>
            <div className={style.sliderContainer}>
              <Card cardObj={cardObject} settings={settings} answer={answer} callback={setAns} count={count} />
            </div>
            <div className={style.controlContainer}>
              <button onClick={() => { setAns(true); }}>Ответить</button>
              <button onClick={handleNext}>Далее</button>
              <div className={style.progressBar}>
                {count + 1}
                <progress value={count + 1} max={wordsPerDay} />
                {wordsPerDay}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
