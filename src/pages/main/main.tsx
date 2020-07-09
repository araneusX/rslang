/* eslint-disable react/button-has-type */
import React, { useContext, useState, useEffect, ChangeEventHandler } from 'react';
import style from './main.module.scss';
import cardStyle from './components/card.module.scss';
import Card from './components/card';
import { BackendWordInterface, StatisticsInterface } from '../../types';
import { StateContext } from '../../store/stateProvider';
import trainGameCard from './components/training';
import { StatisticsContext } from '../../statistics/statisticsProvider';
import Preloader from '../../commonComponents/preloader/preloader'

const Main = () => {
  const { state, dispatch } = useContext(StateContext);

  const [preloaderState, setPreloaderState] = useState(false);
  const { isAudioOn, isFirstVisit, trainingMode, card } = state.training;
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const [startPreview, setStart] = useState(true);
  const [endPreview, setEndPreview] = useState(false);
  const [firstVisitOnGame, setFirstVisitOnGame] = useState(true);
  const [errorCard, setErrorCard] = useState(false);

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
          setPreloaderState(true);
          const result = await (trainGameCard(state.auth.userId, state.auth.token, trainingMode));
          if (!ignore) {
            if (result === null) {
              setErrorCard(true);
            } else {
              dispatch({ type: 'SET_TRAINING_CARD', value: result });
              console.log('текущая карточка', result);
              togglerButtons();
            }
            setPreloaderState(false);
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
        setPreloaderState(true);
        const result = await (trainGameCard(state.auth.userId, state.auth.token, trainingMode));
        if (!ignore) {
          if (result === null) {
            setErrorCard(true);
          } else {
            dispatch({ type: 'SET_TRAINING_CARD', value: result });
            togglerButtons();
            console.log('текущая карточка', result);
          }
          setPreloaderState(false);
        }
      }
    }
    fetchData();
    return () => { ignore = true; };
  }, [sessionVocWrdCount]);

  const togglerButtons = () => {
    document.getElementById('inputAnswer')?.focus();
    document.getElementById('deleteBtn')?.classList.remove(cardStyle.restore);
    if (trainingMode === 'difficult') {
      document.getElementById('difficultBtn')?.classList.add(cardStyle.restoreDifficult);
    } else {
      document.getElementById('difficultBtn')?.classList.remove(cardStyle.restoreDifficult);
    }
  }

  useEffect(() => {
    dispatch({ type: 'SET_TRAINING_FIRST_VISIT', value: false });
    setFirstVisitOnGame(false);
  }, []);

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

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>):void => {
    setErrorCard(false);
    if(!answer){
      dispatch({ type: 'SET_TRAINING_MODE', value: event.target.value});
      setSessionVocWrdCount(sessionVocWrdCount + 1);
    }
  }

  return (
    <>
      {preloaderState &&
        <Preloader></Preloader>
      }
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
            <div className={style.commonControlContainer}>
            <select id='selectMode' value={trainingMode} onChange={selectHandler} disabled={answer}>
              <option value='basic'>Слова вперемешку</option>
              <option value='difficult'>Сложные слова</option>
              <option value='repeat'>Слова на повторение</option>
              <option value='new'>Новые слова</option>
            </select>
              { isAudioOn ? (
                <div className={style.soundOn} onClick={handleSoundControl}></div>
              ) : (
                <div className={style.soundOff} onClick={handleSoundControl}></div>
              )}
            </div>
            {!errorCard ? (
              <>
              <Card
                settings={settings}
                answer={answer}
                callback={setAns}
                count={count}
                nextCard={nextCard}
              />
              <div className={style.cardBottomContainer}>
                <p className={style.wordTranslateContainer}>
                  {settings.translateToTheCard
                    && <span>{card.wordTranslate} </span>}
                  {settings.transcriptionToCard
                    && <span><i>{card.transcription}</i></span>}
                </p>
                <div onClick={() => { setAns(true); }}>Ответить</div>
              </div>
              </>
            ) : (
              <>
              <h2>Карточек в этом режиме не осталось...</h2>
                <p>
                  &#8195;Поменяй один из следующих пунктов чтобы продолжить изучение:</p>
                  <ul>
                    <li>Режим игры(выпадающий список сверху)</li>
                    <li>Колличество новых слов на сегодня(в настройках)</li>
                  </ul>
              </>
            )}
            <div className={style.controlContainer}>
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
