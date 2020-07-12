/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, {
  useContext, useEffect, useState, useCallback
} from 'react';

import style from './main.module.scss';
import { downloadNewWords, getManyWordsById } from '../../../../backend/words';
import {
  BackendWordInterface, OurGameWordInterface, SpeakitModeType, StatisticsInterface
} from '../../../../types';

import { StateContext } from '../../../../store/stateProvider';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';

interface Props {
  rightAnswerArray: Array<OurGameWordInterface>,
  wrongAnswerArray: Array<OurGameWordInterface>
}

const Main = (props: Props) => {
  const { state, dispatch } = useContext(StateContext);
  const {
    round, level, words, images, game, mode, complete
  } = state.our;

  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const isUserWords = (statistics.getAllWordsStatistics()).length >= 10;

  const [counter, setCounter] = useState<number>(0);
  const [chosenImage, setChosenImage] = useState<string>('');
  const [chosenWord, setChosenWord] = useState<string>('');
  const [rightAnswer, setRightAnswer] = useState<OurGameWordInterface>();
  const [wrongAnswer, setWrongAnswer] = useState<OurGameWordInterface>();
  const [endOfGame, setEndOfGame] = useState<boolean>(false);
  const [isloading, setLoading] = useState<boolean>(false);

  const partOfUrl = 'https://raw.githubusercontent.com/araneusx/rslang-data/master/data/';

  if (!isUserWords && mode === 'user') {
    dispatch({ type: 'SET_OUR_MODE', value: 'vocabulary' });
  }

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      let result: any;
      setLoading(true);
      if (mode === 'user' && isUserWords) {
        const userWordsIds = statistics.getAllWordsId().slice(0, 10);
        result = await getManyWordsById(userWordsIds);
      } else {
        result = await downloadNewWords(level, round * 10, 10);
      }
      if (!ignore) {
        if (result.ok) {
          const newWords: OurGameWordInterface[] = result.content.map((word: BackendWordInterface, i:number) => (
            {
              ...word,
              isChosen: false,
              index: i
            }
          ));
          dispatch({ type: 'SET_OUR_WORDS', value: newWords });
          const newImages: OurGameWordInterface[] = shuffle(result.content).map((word: BackendWordInterface, i:number) => (
            {
              ...word,
              isChosen: false,
              index: i
            }
          ));
          setLoading(false);
          dispatch({ type: 'SET_OUR_IMAGES', value: newImages });
        } else {
          console.log('BACKEND ERROR: Assocoations');
        }
      }
    }

    if (words.length === 0) {
      fetchData();
    }
    return () => { ignore = true; };
  }, []);

  const shuffle = (array: Array<OurGameWordInterface>) => {
    const newArray = array.sort(() => Math.random() - 0.5);
    return newArray;
  };

  const setNewWords = async (
    newLevel: number,
    newRound: number,
    newMode: SpeakitModeType
  ) => {
    let result: any;
    setLoading(true);
    if (newMode === 'user' && isUserWords) {
      const userWordsIds = statistics.getAllWordsId().slice(0, 10);
      result = await getManyWordsById(userWordsIds);
    } else {
      result = await downloadNewWords(newLevel, newRound * 10, 10);
    }
    if (result.ok) {
      const newWords: OurGameWordInterface[] = result.content.map((word: BackendWordInterface, i:number) => (
        {
          ...word,
          isChosen: false,
          index: i
        }
      ));
      dispatch({ type: 'SET_OUR_WORDS', value: newWords });
      const newImages: OurGameWordInterface[] = shuffle(result.content).map((word: BackendWordInterface, i:number) => (
        {
          ...word,
          isChosen: false,
          index: i
        }
      ));
      dispatch({ type: 'SET_OUR_IMAGES', value: newImages });
      const right = words.reduce((acc, word) => (word.isChosen ? acc + 1 : acc), 0);
      statistics.saveMini('our', right);
      dispatch({ type: 'SET_OUR_GAME', value: false });
      dispatch({ type: 'SET_OUR_COMPLETE', value: false });
    } else {
      console.log('BACKEND ERROR: Associations');
    }
    setLoading(false);
  };

  const handleChoose = (word: OurGameWordInterface, typeOfPart: string) => {
    if (!game) {
      if (typeOfPart === 'image') {
        if (chosenWord === '') {
          setChosenImage(word.word);
        } else {
          if (chosenWord === word.word) {
            const audio = new Audio('/mp3/correct.mp3');
            audio.play();

            word.isChosen = true;
            setRightAnswer(word);
            setChosenImage('');
            setChosenWord('');
            setCounter(counter + 1);
          }

          if (chosenWord !== word.word) {
            const audio = new Audio('/mp3/error.mp3');
            audio.play();

            setWrongAnswer(word);
            setChosenImage('');
            setChosenWord('');
          }
        }
      }
      if (typeOfPart === 'word') {
        if (chosenImage === '') {
          setChosenWord(word.word);
        } else {
          if (chosenImage === word.word) {
            const audio = new Audio('/mp3/correct.mp3');
            audio.play();

            word.isChosen = true;
            setRightAnswer(word);
            setChosenImage('');
            setChosenWord('');
            setCounter(counter + 1);
          }
          if (chosenImage !== word.word) {
            const audio = new Audio('/mp3/error.mp3');
            audio.play();

            setWrongAnswer(word);
            setChosenImage('');
            setChosenWord('');
          }
        }
      }
    }
    endGame();
  };

  const endGame = () => {
    if (words.every((word) => word.isChosen === true)) {
      setEndOfGame(true);
      statistics.saveMini('our', (props.rightAnswerArray.length - props.wrongAnswerArray.length));
      dispatch({ type: 'SET_OUR_GAME', value: false });
      dispatch({ type: 'SET_OUR_COMPLETE', value: true });
      dispatch({ type: 'SET_OUR_SCREEN', value: 'results' });
    }
  };

  if (rightAnswer !== undefined && !props.rightAnswerArray.includes(rightAnswer)) {
    props.rightAnswerArray.push(rightAnswer);
  }
  if (wrongAnswer !== undefined && !props.wrongAnswerArray.includes(wrongAnswer)) {
    props.wrongAnswerArray.push(wrongAnswer);
  }

  const handleRadioChange = (value: SpeakitModeType) => {
    const newMode = value;
    setNewWords(level, round, newMode);
    dispatch({ type: 'SET_OUR_MODE', value });
  };

  const handleLevelChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const newLevel: number = Number(target.value);
    dispatch({ type: 'SET_OUR_LEVEL', value: newLevel });
    dispatch({ type: 'SET_OUR_ROUND', value: 0 });
    setNewWords(newLevel, 0, 'vocabulary');
  };

  const handleRoundChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    const newRound: number = Number(target.value);
    dispatch({ type: 'SET_OUR_ROUND', value: newRound });
    setNewWords(newRound, 0, 'vocabulary');
  };

  const handleRestart = async () => {
    setLoading(true);
    dispatch({ type: 'SET_OUR_GAME', value: false });
    dispatch({ type: 'SET_OUR_COMPLETE', value: false });
    let newLevel = level;
    let newRound = round;
    let result;
    if (mode === 'vocabulary') {
      if (round === 59) {
        if (level < 5) {
          newLevel = level + 1;
        } else {
          newLevel = 0;
        }
        newRound = 0;
      } else {
        newRound = round + 1;
      }
      result = await downloadNewWords(newLevel, newRound * 10, 10);
    } else {
      const userWordsIds = statistics.getAllWordsId().slice(0, 10);
      result = await getManyWordsById(userWordsIds);
    }
    if (result.ok) {
      const newWords: OurGameWordInterface[] = result.content.map((word: BackendWordInterface, i:number) => (
        {
          ...word,
          isChosen: false,
          index: i
        }
      ));

      if (!complete) {
        const rightCount = words.reduce((acc, word) => (word.isChosen ? acc + 1 : acc), 0);
        statistics.saveMini('our', rightCount);
      }

      dispatch({ type: 'SET_OUR_WORDS', value: newWords });
      dispatch({ type: 'SET_OUR_ROUND', value: newRound });
      dispatch({ type: 'SET_OUR_LEVEL', value: newLevel });
    } else {
      console.error('BACKEND ERROR: Associations');
    }
    setLoading(false);
    dispatch({ type: 'SET_OUR_SCREEN', value: 'main' });
  };

  const handleResults = () => {
    dispatch({ type: 'SET_OUR_SCREEN', value: 'results' });
  };

  return (
    <>
      <form
        className={style.levels}
      >
        <div className={style.radio}>
          <label htmlFor="radio-user">
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
          <label htmlFor="radio-vocabulary">
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
      <div className={style.wrapper}>
        <div className={style.screen}>
          <div className={style.gameContentWrapper}>
            <div className={style.images}>
              {words.map((word: OurGameWordInterface, i:number) => {
                let classNames = `${style.imageCardWrapper} ${word.word}`;
                classNames += ` ${style.usual}`;
                if (chosenImage === word.word && props.rightAnswerArray === [] && props.wrongAnswerArray === []) {
                  classNames += ` ${style.current}`;
                }
                if (props.rightAnswerArray.includes(word)) {
                  classNames += ` ${style.right}`;
                }
                return (
                  <button
                    className={`${classNames}`}
                    key={word.id}
                    onClick={game ? undefined : handleChoose.bind(null, word, 'image')}
                    tabIndex={game ? undefined : i}
                    type="button"
                    disabled={word.isChosen}
                  >
                    <img className={`${style.imageCard} ${word.word}`} src={`${partOfUrl}${word.image.slice(6)}`} alt="some" width="50" height="95" />
                    <p className={`${style.tipText}`}>{word.textExampleTranslate}</p>
                  </button>
                );
              })}
            </div>
            <div className={style.words}>
              {words.map((word: OurGameWordInterface, i:number) => {
                let classNames = `${style.word} ${word.word}`;
                classNames += ` ${style.usual}`;
                if (chosenWord === word.word && props.rightAnswerArray === [] && props.wrongAnswerArray === []) {
                  classNames += ` ${style.current}`;
                }
                if (props.rightAnswerArray.includes(word)) {
                  classNames += ` ${style.right}`;
                }
                return (
                  <button
                    className={classNames}
                    key={word.id}
                    type="button"
                    tabIndex={game ? undefined : i}
                    onClick={game ? undefined : handleChoose.bind(null, word, 'word')}
                    disabled={word.isChosen}
                  >
                    <div className={style.wordInnerWrapper}>
                      <div className={style.value}>{word.word}</div>
                      <div className={style.transcription}>{word.transcription}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className={style.controls}>
            <button
              className={style.button}
              type="button"
              onClick={handleRestart}
            >
              Заново
            </button>
            <button
              className={style.button}
              type="button"
              onClick={handleResults}
            >
              Результаты
            </button>
          </div>
        </div>
      </div>
      {/* {isloading && <div className={style.preloader}><Preloader /></div>} */}
    </>
  );
};

export default Main;
