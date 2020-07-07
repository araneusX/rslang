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
  const { isAudioOn, isFirstVisit } = state.training
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  //const [cardObject, setCardObject] = useState<BackendWordInterface >(cardObj[0] as BackendWordInterface);
  const [startPreview, setStart] = useState(true);
  const [endPreview, setEndPreview] = useState(false);
  const [firstVisitOnGame, setFirstVisitOnGame] = useState(true);

  const [count, setCount] = useState<number>(statistics.getDayStatistics().cards + 1);
  const [answer, setAns] = useState(false);
  const [sessionVocWrdCount, setSessionVocWrdCount] = useState(0);

  useEffect(() => {
    if (count > 1) {
      setStart(false);
    }
  }, [startPreview]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (count <= state.settings.wordsPerDay) {
        if (isFirstVisit || !firstVisitOnGame) {
          const result = await (trainGameCard(state.auth.userId, state.auth.token));
          if (!ignore) {
            console.log('текущая карточка', result);
            dispatch({ type: 'SET_TRAINING_CARD', value: result});
          }
        }
      } else {
        setEndPreview(true);
      }
    }
    fetchData();
    return () => { ignore = true; };
  }, [count]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (sessionVocWrdCount > 0) {
        const result = await (trainGameCard(state.auth.userId, state.auth.token));
        if (!ignore) {
          dispatch({ type: 'SET_TRAINING_CARD', value: result});
          console.log('текущая карточка', result);
        }
      }
    }
    fetchData();
    return () => { ignore = true; };
  }, [sessionVocWrdCount]);


  useEffect(() => {
    dispatch({ type: 'SET_TRAINING_FIRST_VISIT', value: false});
    setFirstVisitOnGame(false);
  },[]);

  const {
    addGrageButton,
    addToDifficultWordsButton,
    exampleToCard,
    explainToCard,
    imageToCard,
    pronounseToCard,
    showAnswerButton,
    transcriptionToCard,
    translateToTheCard,
    wordDeleteButton
  } = state.settings.optional;

  const settings = {
    addGrageButton,
    addToDifficultWordsButton,
    exampleToCard,
    explainToCard,
    imageToCard,
    pronounseToCard,
    showAnswerButton,
    transcriptionToCard,
    translateToTheCard,
    wordDeleteButton
  };


  const handleSoundControl = () => {
    if (isAudioOn) {
      dispatch({ type: 'SET_TRAINING_AUDIO', value: false });
    } else {
      dispatch({ type: 'SET_TRAINING_AUDIO', value: true });
    }
  };

  const nextCard = (vocabularyWord: boolean) => {
    setAns(false);
    if (!vocabularyWord) {
      setCount(count + 1);
    } else {
      setSessionVocWrdCount(sessionVocWrdCount + 1);
    }
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
            <Card
              /*cardObj={cardObject}*/
              settings={settings}
              answer={answer}
              callback={setAns}
              count={count}
              nextCard={nextCard}
            />
            <div className={style.controlContainer}>
              { isAudioOn ? (
                <button className={style.soundOn} onClick={handleSoundControl}>Выключить звук</button>
              ) : (
                <button className={style.soundOff} onClick={handleSoundControl}>Включить звук</button>
              )}
              <button onClick={() => { setAns(true); }}>Ответить</button>
              <div className={style.progressBar}>
                <span>{count}</span>
                <progress value={count} max={state.settings.wordsPerDay} />
                <span>{state.settings.wordsPerDay}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
