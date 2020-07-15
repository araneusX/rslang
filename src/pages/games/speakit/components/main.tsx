/* eslint-disable react/no-array-index-key */
import React, {
  useState, useEffect, useMemo, useContext
} from 'react';
import { SimpleButton, Preloader } from '../../../../commonComponents';
import { downloadNewWords, getManyWordsById } from '../../../../backend/words';
import {
  BackendWordInterface, SpeakitWordInterface, SpeakitModeType, StatisticsInterface
} from '../../../../types';
import Recognition from '../recognition';
import { StateContext } from '../../../../store/stateProvider';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';

import style from './main.module.scss';

type MainPropsType = {};

const Main: React.FC<MainPropsType> = () => {
  const { state, dispatch } = useContext(StateContext);
  const {
    round, level, words, game, mode
  } = state.speakit;

  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const [current, setCurrent] = useState<{word: SpeakitWordInterface, field: string}>();
  const [isPause, setPause] = useState(true);
  const [isPreloader, setPreloader] = useState(false);

  const recognition = useMemo(() => new Recognition(), []);

  const isUserWords = (statistics.getAllWordsStatistics()).length >= 10;

  let imageUrl = '';
  let imageAlt = '';
  let fieldText = '';

  if (!isUserWords && mode === 'user') {
    dispatch({ type: 'SET_SPEAKIT_MODE', value: 'vocabulary' });
  }

  if (current) {
    imageUrl = current.word.image.slice(6);
    imageAlt = current.word.word;
    fieldText = current.field;
  }

  useEffect(() => (() => recognition.stop()), []);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      let result: any;
      setPreloader(true);
      if (mode === 'user' && isUserWords) {
        const userWordsIds = statistics.getAllWordsId().slice(0, 10);
        result = await getManyWordsById(userWordsIds);
      } else {
        result = await downloadNewWords(level, round * 10, 10);
      }
      if (!ignore) {
        if (result.ok) {
          const newWords: SpeakitWordInterface[] = result.content.map((word: BackendWordInterface, i:number) => (
            {
              ...word,
              sound: new Audio(`https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${word.audio.slice(6)}`),
              isRecognized: false,
              index: i
            }
          ));
          setPreloader(false);
          setCurrent({ word: newWords[0], field: newWords[0].wordTranslate });
          dispatch({ type: 'SET_SPEAKIT_WORDS', value: newWords });
        } else {
          console.error('BACKEND ERROR: Speak It');
        }
      }
    }

    if (words.length === 0) {
      fetchData();
    } else {
      setCurrent({ word: words[0], field: words[0].wordTranslate });
    }

    return () => { ignore = true; };
  }, []);

  const handleRecognitionClick = () => {
    if (isPause) {
      recognition.startAndDo(onResultRecognition);
      setPause(false);
      if (!game) {
        dispatch({ type: 'SET_SPEAKIT_GAME', value: true });
      }
    } else {
      recognition.stop();
      setPause(true);
    }

    if (!game && current) {
      setCurrent({ ...current, field: '' });
    }
  };

  const handleChoose = (word: SpeakitWordInterface) => {
    if (!game) {
      word.sound.play();
      setCurrent({ word, field: word.wordTranslate });
    }
  };

  const handleRestart = () => {
    if (game) {
      const nowWords = words.map((word) => {
        const nowWord = { ...word };
        nowWord.isRecognized = false;
        return nowWord;
      });
      const right = words.reduce((acc, word) => (word.isRecognized ? acc + 1 : acc), 0);
      statistics.saveMini('speakit', right);
      dispatch({ type: 'SET_SPEAKIT_WORDS', value: nowWords });
      if (current) {
        setCurrent({ ...current, field: '' });
      }
    }
  };

  const handleResults = () => {
    dispatch({ type: 'SET_SPEAKIT_SCREEN', value: 'results' });
  };

  const onResultRecognition = (resultArr: string[]) => {
    let isNewWord = false;
    let nowCurrent: any = { ...current, field: '' };
    const nowWords = [...words];
    words.forEach((word, i) => {
      if (resultArr.includes(word.word.toLowerCase()) && !word.isRecognized) {
        nowWords[i].isRecognized = true;
        nowCurrent = {
          word: nowWords[i],
          field: nowCurrent && nowCurrent.field === '' ? nowWords[i].word : `${nowCurrent.field}, ${nowWords[i].word}`
        };
        isNewWord = true;
        statistics.saveWordMini(word.id, true);
      }
    });
    if (isNewWord) {
      setCurrent(nowCurrent);
      dispatch({ type: 'SET_SPEAKIT_WORDS', value: nowWords });
      const isAllRecognized: boolean = nowWords.reduce((acc: boolean, word) => (
        word.isRecognized ? acc : false
      ), true);
      if (isAllRecognized) {
        recognition.stop();
        statistics.saveMini('speakit', 10);

        dispatch({ type: 'SET_SPEAKIT_GAME', value: false });
        dispatch({ type: 'SET_SPEAKIT_COMPLETE', value: true });

        dispatch({ type: 'SET_SPEAKIT_SCREEN', value: 'results' });
      }
    }
  };

  const handleRadioChange = (value: SpeakitModeType) => {
    const newMode = value;
    setNewWords(level, round, newMode);
    dispatch({ type: 'SET_SPEAKIT_MODE', value });
  };

  const setNewWords = async (
    newLevel: number,
    newRound: number,
    newMode: SpeakitModeType
  ) => {
    let result: any;
    setPreloader(true);
    if (newMode === 'user' && isUserWords) {
      const userWordsIds = statistics.getAllWordsId().slice(0, 10);
      result = await getManyWordsById(userWordsIds);
    } else {
      result = await downloadNewWords(newLevel, newRound * 10, 10);
    }
    if (result.ok) {
      const newWords: SpeakitWordInterface[] = result.content.map((word: BackendWordInterface, i:number) => (
        {
          ...word,
          sound: new Audio(`https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${word.audio.slice(6)}`),
          isRecognized: false,
          index: i
        }
      ));
      recognition.stop();
      const right = words.reduce((acc, word) => (word.isRecognized ? acc + 1 : acc), 0);
      statistics.saveMini('speakit', right);
      dispatch({ type: 'SET_SPEAKIT_GAME', value: false });
      dispatch({ type: 'SET_SPEAKIT_COMPLETE', value: false });
      dispatch({ type: 'SET_SPEAKIT_WORDS', value: newWords });
      setCurrent({ word: newWords[0], field: newWords[0].wordTranslate });
      setPause(true);
    } else {
      console.error('BACKEND ERROR: Speak It');
    }
    setPreloader(false);
  };

  const handleLevelChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const newLevel: number = Number(target.value);
    dispatch({ type: 'SET_SPEAKIT_LEVEL', value: newLevel });
    dispatch({ type: 'SET_SPEAKIT_ROUND', value: 0 });
    setNewWords(newLevel, 0, 'vocabulary');
  };

  const handleRoundChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    const newRound: number = Number(target.value);
    dispatch({ type: 'SET_SPEAKIT_ROUND', value: newRound });
    setNewWords(level, newRound, 'vocabulary');
  };

  return (
    <div className={style.wrapper}>
      {current !== undefined
        && (
        <>
          <form
            className={style.levels}
          >
            <div className={style.radio}>
              <label htmlFor="radio-user" className={style.label}>
                Изученные слова
                <input
                  type="radio"
                  id="radio-user"
                  value="user"
                  checked={mode === 'user'}
                  disabled={!isUserWords}
                  onChange={handleRadioChange.bind(null, 'user')}
                />
              </label>
              <label htmlFor="radio-vocabulary" className={style.label}>
                Все слова
                <input
                  type="radio"
                  id="radio-vocabulary"
                  value="vocabulary"
                  checked={mode === 'vocabulary'}
                  onChange={handleRadioChange.bind(null, 'vocabulary')}
                />
              </label>
            </div>
            {
            mode === 'vocabulary'
            && (
            <div className={style.selects}>
              <div className={style.label}>Уровень:</div>
              <select onChange={handleLevelChange} defaultValue={`${level}`}>
                {(new Array(6)).fill('').map((v, i) => (
                  <option value={`${i}`} key={`${i}`}>{i + 1}</option>
                ))}
              </select>
              <div className={style.label}>Раунд:</div>
              <select onChange={handleRoundChange} defaultValue={`${round}`}>
                {(new Array(60)).fill('').map((v, i) => (
                  <option value={`${i}`} key={`${i}`}>{i + 1}</option>
                ))}
              </select>
            </div>
            )
          }
          </form>
          <div className={style.screen}>
            <img
              className={style.image}
              src={`https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${imageUrl}`}
              alt={imageAlt}
              height="260px"
              width="390px"
            />
            <div className={`${style.field} ${!isPause ? style.game : ''}`}>{fieldText}</div>
          </div>
          <div className={style.words}>
            {words.map((word: SpeakitWordInterface, i:number) => {
              let classNames = `${style.word}`;
              if (!game) {
                if (word.index === current.word.index) {
                  classNames += ` ${style.current}`;
                } else {
                  classNames += ` ${style.usual}`;
                }
              } else if (word.isRecognized) {
                classNames += ` ${style.recognized}`;
              }
              return (
                <div
                  className={classNames}
                  key={word.id}
                  onClick={game ? undefined : handleChoose.bind(null, word)}
                  role={game ? undefined : 'button'}
                  onKeyUp={game ? undefined : (event) => {
                    if (event.key === 'Enter') {
                      handleChoose(word);
                    }
                  }}
                  tabIndex={game ? undefined : 0}
                >
                  {!game && <img src={`${process.env.PUBLIC_URL}/images/sound1.png`} alt="play" />}
                  <div className={style.wordInnerWrapper}>
                    <div className={style.value}>{word.word}</div>
                    <div className={style.transcription}>{word.transcription}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style.controls}>
            <SimpleButton
              clickHandler={handleRestart}
              text="Начать заново"
              size="s2"
            />
            <SimpleButton
              clickHandler={handleRecognitionClick}
              text={isPause ? 'Играть (вкл. микрофон)' : 'Пауза (выкл. микрофон)'}
              size="s2"
            />
            <SimpleButton
              clickHandler={handleResults}
              text="Результаты"
              size="s2"
            />
          </div>
        </>
        )}
      {isPreloader && <div className={style.preloader}><Preloader /></div>}
    </div>
  );
};

export default Main;
