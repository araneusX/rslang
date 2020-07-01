/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useContext, useEffect } from 'react';
import style from './card.module.scss';
import { CardSettingsInterface, StatisticsInterface, BackendWordInterface } from '../../../types';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StateContext } from '../../../store/stateProvider';

const Card: React.FC<{ cardObj: BackendWordInterface,
  settings: CardSettingsInterface, answer: boolean, callback: Function, count: number }> = (prop) => {
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const { cardObj } = prop;
  const { settings } = prop;
  const [inputState, setInputState] = useState('');
  const [userAns, setUserAns] = useState(cardObj.word);
  const [deleteWord, setDelete] = useState(false);
  const [difficult, setDifficult] = useState(false);

  const [difficultLevel, setDifficultLevel] = useState<0|1|2>(0);

  const { state, dispatch } = useContext(StateContext);
  const { card } = state.training;

  useEffect(() => {
    let ignore = false;
    const isRight = cardObj.word.toLocaleLowerCase() === userAns.toLocaleLowerCase();
    async function fetchData() {
      if (prop.count !== 0) {
        console.log(cardObj.id, isRight, difficultLevel, cardObj.group);
        dispatch({ type: 'SET_TRAINING_CARD', value: cardObj });
        await (statistics.saveWord(cardObj.id, isRight, difficultLevel, cardObj.group));
        console.log('Данные отправляются');
      }
      if (!ignore) setDifficultLevel(0); console.log('Отправлены');
    }
    fetchData();
    return () => { ignore = true; };
  }, [prop.count]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (deleteWord) {
        await (statistics.toggleDeleted(cardObj.id));
        console.log('Я тут');
      }
      if (!ignore) console.log('Deleted!');
    }
    fetchData();
    return () => { ignore = true; };
  }, [deleteWord]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (difficult) {
        await (statistics.toggleDifficult(cardObj.id));
        console.log('Ятуут');
      }
      if (!ignore) console.log('Difficult!');
    }
    fetchData();
    return () => { ignore = true; };
  }, [difficult]);

  useEffect(() => {
    if (prop.answer) {
      setUserAns(inputState);
    } else {
      setUserAns(cardObj.word);
    }
    setInputState('');
  }, [prop.answer]);

  const textMeaning = () => ({ __html: cardObj.textMeaning });
  const textExample = () => ({ __html: cardObj.textExample });
  const getRightWay = (url : string) => `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${url.slice(6)}`;

  const textExampleSplit = cardObj.textExample.split(/<b.*?>(.*?)<\/b>/);
  const textMeaningSplit = cardObj.textMeaning.split(/<i.*?>(.*?)<\/i>/);

  const handlerInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);
  };

  const currentWord = () => {
    const currentWordEl = cardObj.word.split('').map((element, index) => {
      if (userAns[index] && element.toLocaleLowerCase() === userAns[index].toLocaleLowerCase()) {
        return `<span style="color: green ">${element}</span>`;
      }
      return `<span style="color: red ">${element}</span>`;
    }).join('');
    return { __html: currentWordEl };
  };

  const handlerInputKeyPress = (event : React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      prop.callback(true);
      const audio = new Audio();
      audio.src = getRightWay(cardObj.audio);
      audio.play();
      const playNext = () => {
        audio.src = getRightWay(cardObj.audioExample);
        audio.play();
      };
      setTimeout(playNext, 1500);
    }
  };

  return (
    <div className={style.cardContainer} id={cardObj.id}>
      <div className={style.wordContainer}>
        { prop.answer ? (
          <div className={style.showCurrentWord} dangerouslySetInnerHTML={currentWord()} />
        ) : (
          <div dangerouslySetInnerHTML={currentWord()} />
        )}
        <input
          value={inputState}
          onChange={handlerInputChange}
          onKeyPress={handlerInputKeyPress}
          maxLength={cardObj.word.length}
        />
      </div>
      {settings.imageToCard
                && <img src={getRightWay(prop.cardObj.image)} alt="" />}
      <>
        {settings.translateToTheCard
                    && (
                    <p>
                      {cardObj.wordTranslate}
                      {settings.transcriptionToCard
                      && <span>{cardObj.transcription}</span>}
                    </p>
                    )}
        {settings.explainToCard
                    && (
                    <>
                      {prop.answer ? (
                        <>
                          <p dangerouslySetInnerHTML={textMeaning()} />
                          <p className={style.putDownOnAns}>{cardObj.textMeaningTranslate}</p>
                        </>
                      ) : (
                        <p>
                          {textMeaningSplit[0]}
                          {inputState}
                          {'•'.repeat(cardObj.word.length - inputState.length)}
                          {textMeaningSplit[2]}
                        </p>
                      )}
                    </>
                    )}
        {settings.exampleToCard
                    && (
                      <>
                        {prop.answer ? (
                          <>
                            <p dangerouslySetInnerHTML={textExample()} />
                            <p className={style.putDownOnAns}>{cardObj.textExampleTranslate}</p>
                          </>
                        ) : (
                          <p>
                            {textExampleSplit[0]}
                            {inputState}
                            {'•'.repeat(cardObj.word.length - inputState.length)}
                            {textExampleSplit[2]}
                          </p>
                        )}
                      </>
                    )}
        {settings.addGradeButton && prop.answer
                    && (
                    <div className={style.gradeContainer}>
                      <div title="Легко" onClick={() => { setDifficultLevel(0); }} className={style.easyBtn}>Es</div>
                      <div title="Средне" onClick={() => { setDifficultLevel(1); }} className={style.mediumBtn}>Md</div>
                      <div title="Сложно" onClick={() => { setDifficultLevel(2); }} className={style.hardBtn}>Hrd</div>
                    </div>
                    )}
        <div className={style.controlContainer}>
          {settings.wordDeleteButton
              && <div onClick={() => { setDelete(true); }}>del</div>}
          {settings.addToDifficultWordsButton
              && <div onClick={() => { setDifficult(true); }}>hrd</div>}
          {settings.showAnswerButton
              && <div onClick={() => { prop.callback(true); }}>?</div>}
        </div>
      </>
    </div>
  );
};

export default Card;
