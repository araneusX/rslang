/* eslint-disable react/button-has-type */
import React, {
  useContext, useState, useEffect
} from 'react';
import { Link } from 'react-router-dom';
import style from './main.module.scss';
import cardStyle from './components/card.module.scss';
import Card from './components/card';
import { StatisticsInterface } from '../../types';
import { StateContext } from '../../store/stateProvider';
import trainGameCard from './components/training';
import { StatisticsContext } from '../../statistics/statisticsProvider';
import Preloader from '../../commonComponents/preloader/preloader';

const Main = () => {
  const { state, dispatch } = useContext(StateContext);

  const [preloaderState, setPreloaderState] = useState(true);
  const {
    isAudioOn, isFirstVisit, trainingMode, card
  } = state.training;
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const [startPreview, setStart] = useState(true);
  const [endPreview, setEndPreview] = useState(false);
  const [firstVisitOnGame, setFirstVisitOnGame] = useState(true);
  const [errorCard, setErrorCard] = useState(false);

  const [count, setCount] = useState<number>(statistics.getDayStatistics().cards + 1);
  const [answer, setAns] = useState(false);
  const [sessionVocWrdCount, setSessionVocWrdCount] = useState(0);

  // useEffect(() => {
  //   if (count > 1) {
  //     setStart(false);
  //   }
  // }, [startPreview]);

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
              document.getElementById('inputAnswer')?.focus();
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
            document.getElementById('inputAnswer')?.focus();
          }
          setPreloaderState(false);
        }
      }
    }
    fetchData();
    return () => { ignore = true; };
  }, [sessionVocWrdCount]);

  const toggleDifficultBtn = () => {
    const difficultBtn = document.getElementById('difficultBtn');
    const findDifficult = statistics.getAllWordsStatistics('difficult').some((elem) => elem.wordId === card.id);
    if (findDifficult) {
      difficultBtn?.classList.add(cardStyle.restoreDifficult);
    } else {
      difficultBtn?.classList.remove(cardStyle.restoreDifficult);
    }
  };

  useEffect(() => {
    toggleDifficultBtn();
    if (isFirstVisit || !firstVisitOnGame) {
      dispatch({ type: 'SET_TRAINING_CARD_DELETE', value: false });
    }
  }, [card]);

  useEffect(() => {
    dispatch({ type: 'SET_TRAINING_FIRST_VISIT', value: false });
    setFirstVisitOnGame(false);
    setPreloaderState(false);
  }, []);

  const {
    addGrageButton,
    addToDifficultWordsButton,
    exampleToCard,
    explainToCard,
    imageToCard,
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
    if (!answer) {
      dispatch({ type: 'SET_TRAINING_MODE', value: event.target.value });
      setSessionVocWrdCount(sessionVocWrdCount + 1);
    }
  };

  return (
    <>
      <div className={style.learnContainer}>
        {preloaderState
        && <Preloader />}
        {startPreview || endPreview ? (
          <div className={style.startBasicGameContainer}>
            {endPreview ? (
              <>
                <h2>Ура! На сегодня все.</h2>
                <p>
                  &#8195;Есть еще новые карточки, но дневной лимит исчерпан.
                  Вы можете увеличить лимит в настройках, но пожалуйста, имейте
                  в виду, что чем больше новых карточек вы просмотрите, тем больше вам надо будет повторять в ближайшее время.
                </p>
                <Link to="/statistics" className={style.toStatisticsBtn}> Статистика </Link>
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
                  {' '}
                  Начать
                  {' '}
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className={style.commonControlContainer}>
              <select id="selectMode" value={trainingMode} onChange={selectHandler} disabled={answer}>
                <option value="basic">Слова вперемешку</option>
                <option value="difficult">Сложные слова</option>
                <option value="repeat">Слова на повторение</option>
                <option value="new">Новые слова</option>
              </select>
              { isAudioOn ? (
                <div className={style.soundOn} onClick={handleSoundControl} title="Выключить автовоспроизведение" />
              ) : (
                <div className={style.soundOff} onClick={handleSoundControl} title="Включить автовоспроизведение" />
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
                    && (
                    <span>
                      {card.wordTranslate}
                      {' '}
                    </span>
                    )}
                    {settings.transcriptionToCard
                    && <span><i>{card.transcription}</i></span>}
                  </p>
                  <div onClick={() => { setAns(true); }}>Ответить</div>
                </div>
              </>
            ) : (
              <div className={style.startBasicGameContainer}>
                <h2>Карточек в этом режиме не осталось!</h2>
                <p>
                  &#8195;Поменяй один из следующих пунктов чтобы продолжить изучение:
                </p>
                <ul>
                  <li>Режим игры(выпадающий список сверху)</li>
                  <li>Колличество новых слов на сегодня(в настройках)</li>
                </ul>
              </div>
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
