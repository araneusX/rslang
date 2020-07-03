/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useState, useContext, useEffect, useMemo, useRef
} from 'react';
import style from './card.module.scss';
import { CardSettingsInterface, StatisticsInterface, BackendWordInterface } from '../../../types';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StateContext } from '../../../store/stateProvider';

const Card: React.FC<{ cardObj: BackendWordInterface,
  settings: CardSettingsInterface, answer: boolean,
  callback: Function, count: number, soundState: boolean, nextCard: Function }> = (prop) => {
  const { dispatch } = useContext(StateContext);

  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const { cardObj, settings } = prop;
  const [inputState, setInputState] = useState('');

  const [userAns, setUserAns] = useState(cardObj.word);
  const [showAns, setShowAns] = useState(false);

  const isRight = useMemo(() => (cardObj.word.toLocaleLowerCase() === inputState.toLocaleLowerCase()), [prop.answer]);
  const sound = useMemo(() => new Audio(), []);

  const inputEl = useRef<HTMLInputElement>(null);

  const sendData = (difficultLevel: 0|1|2) => {
    let ignore = false;
    async function fetchData() {
      console.log('Собираюсь отправить:', cardObj.id, isRight, difficultLevel, cardObj.group);
      await (statistics.saveWord(cardObj.id, isRight, difficultLevel, cardObj.group));
      if (!ignore) console.log('Отправлено');
    }
    fetchData();
    return () => { ignore = true; };
  };

  useEffect(() => {
    if (prop.answer) {
      setUserAns(inputState);
      if (settings.addGradeButton && (isRight || showAns)) {
        console.log('отметь уровень сложности!');
      }
      if (prop.soundState) {
        playAudio();
        dispatch({ type: 'SET_TRAINING_AUDIO', value: true });
      } else dispatch({ type: 'SET_TRAINING_AUDIO', value: false });
      if (!settings.addGradeButton && !prop.soundState && (isRight || showAns)) {
        sendData(1);
        setTimeout(prop.nextCard, 1000);
        setShowAns(false);
      }
    } else if (inputEl.current) {
      setUserAns(cardObj.word);
      inputEl.current.focus();
    }
    setInputState('');
  }, [prop.answer]);

  const playAudio = () => {
    sound.src = getRightWay(cardObj.audio);
    sound.play();
  };

  sound.onended = () => {
    if (sound.src === getRightWay(cardObj.audio)) {
      if (settings.explainToCard) {
        sound.src = getRightWay(cardObj.audioMeaning);
      } else if (settings.exampleToCard) {
        sound.src = getRightWay(cardObj.audioExample);
      }
      sound.play();
    } else if ((sound.src === getRightWay(cardObj.audioMeaning)) && settings.exampleToCard) {
      sound.src = getRightWay(cardObj.audioExample);
      sound.play();
    } else if ((isRight || showAns) && !settings.addGradeButton) {
      sendData(1);
      prop.nextCard();
      setShowAns(false);
    }
  };

  const getRightWay = (url : string) => `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${url.slice(6)}`;
  const textExampleSplit = cardObj.textExample.split(/<b.*?>(.*?)<\/b>/);
  const textMeaningSplit = cardObj.textMeaning.split(/<i.*?>(.*?)<\/i>/);
  const textMeaning = () => ({ __html: cardObj.textMeaning });
  const textExample = () => ({ __html: cardObj.textExample });
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
    }
  };
  const handlerInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    if ((prop.answer && !isRight && !settings.addGradeButton)
      || (prop.answer && !isRight && settings.addGradeButton && !showAns)) {
      prop.callback(false);
      sound.pause();
    } else if (!prop.answer) {
      setInputState(event.target.value);
    }
  };

  const handlerDeleteWord = () => {
    statistics.toggleDeleted(cardObj.id);
    prop.nextCard();
  };

  const handlerToDifficult = () => {
    statistics.toggleDifficult(cardObj.id);
    prop.nextCard();
  };

  const handleShowAnswer = () => {
    setShowAns(true);
    prop.callback(true);
  };

  const handlerDifficultLevel = (level: 1|2|0) => {
    if (isRight || showAns) {
      sound.pause();
      sendData(level);
      prop.nextCard();
      setShowAns(false);
    }
  };

  const handleCurrentWord = () => {
    if (inputEl.current && !isRight) {
      inputEl.current.focus();
    }
  };

  return (
    <div className={style.cardContainer} id={cardObj.id}>
      <div className={style.wordContainer}>
        { prop.answer ? (
          <div
            className={style.showCurrentWord}
            dangerouslySetInnerHTML={currentWord()}
            onClick={handleCurrentWord}
          />
        ) : (
          <div dangerouslySetInnerHTML={currentWord()} />
        )}
        <input
          ref={inputEl}
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
        {settings.addGradeButton && prop.answer && (isRight || showAns)
                    && (
                    <div className={style.gradeContainer}>
                      <div title="Легко" id="easyLevel" onClick={() => { handlerDifficultLevel(0); }} className={style.easyBtn}>Es</div>
                      <div title="Средне" id="middleLevel" onClick={() => { handlerDifficultLevel(1); }} className={style.mediumBtn}>Md</div>
                      <div title="Сложно" id="hardLevel" onClick={() => { handlerDifficultLevel(2); }} className={style.hardBtn}>Hrd</div>
                    </div>
                    )}
        <div className={style.controlContainer}>
          {settings.wordDeleteButton
              && <div onClick={handlerDeleteWord}>del</div>}
          {settings.addToDifficultWordsButton
              && <div onClick={handlerToDifficult}>hrd</div>}
          {settings.showAnswerButton
              && <div onClick={handleShowAnswer}>?</div>}
        </div>
      </>
    </div>
  );
};

export default Card;
