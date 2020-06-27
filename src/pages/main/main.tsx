import React, { useContext, useState } from 'react';

import style from './main.module.scss';
import Card from './components/card';
import cardObj from '../../mosk/testCardObj';
import { StateContext } from '../../store/stateProvider';

const Main = () => {
  const { state } = useContext(StateContext);
  const {
    addGradeButton,
    addToDifficultWordsButton,
    exampleToCard,
    explainToCard,
    imageToCard,
    pronounceToCard: pronounceToCard,
    showAnswerButton,
    transcriptionToCard,
    translateToTheCard,
    wordDeleteButton,
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
    wordDeleteButton,
  };

const [startPreview, setStart] = useState(true);
const [count, setCount] = useState(0);
const [answer, setAns] = useState(false);

const handleNext = () => {
  setAns(false);
  setCount(count + 1);
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
              {count > 0 ? (
                <img
                  src="https://image.flaticon.com/icons/png/512/130/130884.png"
                  className={style.leftArrowBtn}
                  onMouseDown={() => { setCount(count - 1); }}
                />
              ) : (
                <img
                  src="https://image.flaticon.com/icons/png/512/130/130884.png"
                  className={style.leftArrowBtnInactive}
                />
              )}
              <Card cardObj={cardObj[count]} settings={settings} answer={answer} />
              <img
                src="https://image.flaticon.com/icons/png/512/130/130884.png"
                className={style.rightArrowBtn}
                onMouseDown={handleNext}
              />
            </div>
            <div className={style.controlContainer}>
              <button onClick={() => { setAns(true); }}>Ответить</button>
              <div className={style.progressBar}>
                {count + 1}
                <progress value={count + 1} max={cardObj.length} />
                {cardObj.length}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
