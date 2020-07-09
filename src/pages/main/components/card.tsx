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

const Card: React.FC<{
  settings: CardSettingsInterface, answer: boolean,
  callback: Function, count: number, nextCard: Function }> = (prop) => {
  const { state } = useContext(StateContext);
  const { isAudioOn, card } = state.training;
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const { settings } = prop;
  const [inputState, setInputState] = useState('');

  const [userAns, setUserAns] = useState(card.word);
  const [showAns, setShowAns] = useState(false);

  const isRight = useMemo(() => (card.word.toLocaleLowerCase() === inputState.toLocaleLowerCase()), [prop.answer]);
  const sound = useMemo(() => new Audio(), []);

  const inputEl = useRef<HTMLInputElement>(null);

  const sendData = (difficultLevel: 0|1|2) => {
    let ignore = false;
    async function fetchData() {
      console.log('Собираюсь отправить:', card.id, isRight, difficultLevel, card.group);
      await (statistics.saveWord(card.id, isRight, difficultLevel, card.group));
      if (!ignore) console.log('Отправлено');
    }
    fetchData();
    return () => { ignore = true; };
  };

  useEffect(() => {
    if (prop.answer) {
      if (!isRight && !showAns) {
        document.getElementById('currentWord')?.classList.add(style.opacity);
      }
      if (inputEl.current) {
        inputEl.current.blur();
      }
      setUserAns(inputState);
      if (settings.addGrageButton && (isRight || showAns)) {
        console.log('отметь уровень сложности!');
      }
      if (isAudioOn) {
        playAudio();
      }
      if (!settings.addGrageButton && !isAudioOn && (isRight || showAns)) {
        sendData(1);
        prop.nextCard(false);
        setShowAns(false);
      }
    } else if (inputEl.current) {
      setUserAns(card.word);
      inputEl.current.focus();
    }
    setInputState('');
  }, [prop.answer]);

  const playAudio = () => {
    sound.src = getRightWay(card.audio);
    sound.play();
  };

  sound.onended = () => {
    if (sound.src === getRightWay(card.audio)) {
      if (settings.explainToCard) {
        sound.src = getRightWay(card.audioMeaning);
      } else if (settings.exampleToCard) {
        sound.src = getRightWay(card.audioExample);
      }
      if (sound.src !== getRightWay(card.audio)) {
        sound.play();
      }
    } else if ((sound.src === getRightWay(card.audioMeaning)) && settings.exampleToCard) {
      sound.src = getRightWay(card.audioExample);
      sound.play();
    } else if ((isRight || showAns) && !settings.addGrageButton) {
      sendData(1);
      prop.nextCard(false);
      setShowAns(false);
    }
  };

  const getRightWay = (url : string) => `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${url.slice(6)}`;
  const textExampleSplit = card.textExample.split(/<b.*?>(.*?)<\/b>/);
  const textMeaningSplit = card.textMeaning.split(/<i.*?>(.*?)<\/i>/);
  const textMeaning = () => ({ __html: card.textMeaning });
  const textExample = () => ({ __html: card.textExample });
  const currentWord = () => {
    const currentWordEl = card.word.split('').map((element, index) => {
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
    if ((prop.answer && !isRight && !settings.addGrageButton)
      || (prop.answer && !isRight && settings.addGrageButton && !showAns)) {
      prop.callback(false);
      sound.currentTime = 0;
      sound.pause();
    } else if (!prop.answer) {
      setInputState(event.target.value);
    }
  };

  const handlerDeleteWord = (event: React.MouseEvent<HTMLDivElement>):void => {
    statistics.toggleDeleted(card.id);
    event.currentTarget?.classList.toggle(style.restore);
  };

  const handlerToDifficult = (event: React.MouseEvent<HTMLDivElement>):void => {
    statistics.toggleDifficult(card.id);
    event.currentTarget.classList.toggle(style.restoreDifficult);
  };

  const handleShowAnswer = () => {
    setShowAns(true);
    prop.callback(true);
  };

  const handlerDifficultLevel = (level: 1|2|0|3) => {
    if (isRight || showAns) {
      sound.currentTime = 0;
      sound.pause();
      prop.callback(false);
      setShowAns(false);
      if (level !== 3) {
        sendData(level);
        prop.nextCard(false);
      }
    }
  };

  const handleCurrentWord = () => {
    if (inputEl.current && !isRight) {
      inputEl.current.focus();
    }
  };

  return (
    <div className={style.cardContainer} id={card.id}>
      <div className={style.mainInfoContainer}>
        <div className={style.wordContainer}>
          { prop.answer ? (
            <div
              className={style.showCurrentWord}
              dangerouslySetInnerHTML={currentWord()}
              onClick={handleCurrentWord}
              id="currentWord"
            />
          ) : (
            <div dangerouslySetInnerHTML={currentWord()} />
          )}
          <input
            id="inputAnswer"
            ref={inputEl}
            value={inputState}
            onChange={handlerInputChange}
            onKeyPress={handlerInputKeyPress}
            maxLength={card.word.length}
          />
        </div>
        {settings.imageToCard
                && <img src={getRightWay(card.image)} alt="" />}
        {settings.explainToCard
                    && (
                    <>
                      {prop.answer ? (
                        <>
                          <p dangerouslySetInnerHTML={textMeaning()} />
                          <p className={style.putDownOnAns}>{card.textMeaningTranslate}</p>
                        </>
                      ) : (
                        <p>
                          {textMeaningSplit[0]}
                          {inputState}
                          {'•'.repeat(card.word.length - inputState.length)}
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
                            <p className={style.putDownOnAns}>{card.textExampleTranslate}</p>
                          </>
                        ) : (
                          <p>
                            {textExampleSplit[0]}
                            {inputState}
                            {'•'.repeat(card.word.length - inputState.length)}
                            {textExampleSplit[2]}
                          </p>
                        )}
                      </>
                    )}
        {settings.addGrageButton && prop.answer && (isRight || showAns)
                    && (
                    <div className={style.gradeContainer}>
                      <div title="Заново" id="repeat" onClick={() => { handlerDifficultLevel(3); }} className={style.repeatBtn} />
                      <div title="Легко" id="easyLevel" onClick={() => { handlerDifficultLevel(0); }} className={style.easyBtn} />
                      <div title="Средне" id="middleLevel" onClick={() => { handlerDifficultLevel(1); }} className={style.mediumBtn} />
                      <div title="Сложно" id="hardLevel" onClick={() => { handlerDifficultLevel(2); }} className={style.hardBtn} />
                    </div>
                    )}
      </div>
      <div className={style.controlContainer}>
        {settings.wordDeleteButton
              && <div id="deleteBtn" title="Удалить слово" className={style.deleteBtn} onClick={handlerDeleteWord} />}
        {settings.addToDifficultWordsButton
              && <div id="difficultBtn" title="Занести слово в словарь" className={style.toDifficultBtn} onClick={handlerToDifficult} />}
        {settings.showAnswerButton
              && <div title="Показать ответ" className={style.showAnsBtn} onClick={handleShowAnswer} />}
      </div>
    </div>
  );
};

export default Card;
