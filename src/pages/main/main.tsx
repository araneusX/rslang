/* eslint-disable react/button-has-type */
import React, { useContext, useState, useEffect } from 'react';
import style from './main.module.scss';
import Card from './components/card';
import { BackendWordInterface, StatisticsInterface } from '../../types';
import cardObj from '../../mosk/testCardObj';
import { StateContext } from '../../store/stateProvider';
import trainGameCard from './components/training';
import { StatisticsContext } from '../../statistics/statisticsProvider';

const Main = () => {
  const { state, dispatch } = useContext(StateContext);
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const [cardObject, setCardObject] = useState<BackendWordInterface >(cardObj[0] as BackendWordInterface);
  const [startPreview, setStart] = useState(true);
  const [endPreview, setEndPreview] = useState(false);

  const [count, setCount] = useState<number>(statistics.getDayStatistics().cards);
  const [answer, setAns] = useState(false);

  const [soundState, setSound] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (count < state.settings.wordsPerDay) {
        const result = await (trainGameCard(state.auth.userId, state.auth.token));
        if (!ignore) console.log('текущая карточка', result); setCardObject(result);
      } else {
        setEndPreview(true);
      }
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
      if ((count + 1) > state.settings.wordsPerDay) {
        dispatch({ type: 'SET_TRAINING_COMPLETE', value: true });
        alert('End of training!');
      } else setCount(count + 1);
    }
  };

  const handleSoundControl = () => {
    if (soundState) {
      setSound(false);
    } else {
      setSound(true);
    }
  };

  const nextCard = () => {
    setAns(false);
    setCount(count + 1);
  };

  return (
    <>
      <div className={style.learnContainer}>
        {startPreview || endPreview ? (
          <div className={style.startBasicGameContainer}>
            {endPreview ? (
              <>
                <h2>На сегодня все...</h2>
                <p>
                  &#8195;Ты отлично постарался! Возвращайся завтра за новыми знаниями!
                </p>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        ) : (
          <>
            <div className={style.sliderContainer}>
              <Card
                cardObj={cardObject}
                settings={settings}
                answer={answer}
                callback={setAns}
                count={count}
                soundState={soundState}
                nextCard={nextCard}
              />
            </div>
            <div className={style.controlContainer}>
              { soundState ? (
                <button className={style.soundOn} onClick={handleSoundControl}>Выключить звук</button>
              ) : (
                <button className={style.soundOff} onClick={handleSoundControl}>Включить звук</button>
              )}
              <button onClick={() => { setAns(true); }}>Ответить</button>
              <button onClick={handleNext}>Далее</button>
              <div className={style.progressBar}>

                {count}
                <progress value={count} max={state.settings.wordsPerDay} />
                {state.settings.wordsPerDay}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
