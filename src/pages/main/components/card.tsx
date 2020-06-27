import React, { useState, useContext  } from 'react';
import style from './card.module.scss';
import { CardInterface, CardSettingsInterface } from '../../../types';
import trainGameCard from './training';
import { StateContext } from '../../../store/stateProvider';

const Card: React.FC<{ cardObj: CardInterface, settings: CardSettingsInterface, answer: any }> = (prop) => {
  const { cardObj } = prop;
  const { settings } = prop;
  const [inputState, setInputState] = useState('');

  const textMeaning = () => ({ __html: cardObj.textMeaning });
  const textExample = () => ({ __html: cardObj.textExample });
  const getRightWay = (url : string) => `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${url.slice(6)}`;

  const textExampleSplit = cardObj.textExample.split(/<b.*?>(.*?)<\/b>/);
  const textMeaningSplit = cardObj.textMeaning.split(/<i.*?>(.*?)<\/i>/);
  const state = useContext(StateContext);

  const handlerInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);
  };

  const currentWord = () => {
    const word = prop.answer ? inputState : cardObj.word;
    const currentWordEl = cardObj.word.split('').map((element, index) => {
      if (word[index] && element === word[index]) {
        return `<span style="color: green ">${element}</span>`;
      }
      return `<span style="color: red ">${element}</span>`;
    }).join('');
    return { __html: currentWordEl };
  };

  const handlerInputKeyPress = (event : React.KeyboardEvent) => {
    if (event.key === 'Enter') {
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
        { prop.answer ? (
          <input
            value=""
            onChange={handlerInputChange}
            onKeyPress={handlerInputKeyPress}
            maxLength={cardObj.word.length}
          />
        ) : (
          <input
            value={inputState}
            onChange={handlerInputChange}
            onKeyPress={handlerInputKeyPress}
            maxLength={cardObj.word.length}
          />
        )}
      </div>
      {settings.imageToCard
                && <img src={getRightWay(prop.cardObj.image)} alt="kg" />}
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
                      <div title="Легко" className={style.easyBtn}>Es</div>
                      <div title="Средне" className={style.mediumBtn}>Md</div>
                      <div title="Сложно" className={style.hardBtn}>Hrd</div>
                    </div>
                    )}
        <div className={style.controlContainer}>
          {settings.wordDeleteButton
              && <div>del</div>}
          {settings.addToDifficultWordsButton
              && <div>hrd</div>}
          {settings.showAnswerButton
              && <div>?</div>}
        </div>
      </>
    </div>
  );
};

export default Card;
