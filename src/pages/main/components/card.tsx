/* eslint-disable max-len */
import React, { useContext } from 'react';
import style from './card.module.scss';
import { CardInterface, CardSettingsInterface } from '../../../types';
import trainGameCard from './training';
import { StateContext } from '../../../store/stateProvider';

const Card: React.FC<{ cardObj: CardInterface, settings: CardSettingsInterface, answer: any }> = (prop) => {
  const { cardObj } = prop;
  const { settings } = prop;

  const textMeaning = () => ({ __html: cardObj.textMeaning });
  const getRightWay = (url : string) => `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${url.slice(6)}`;

  const textExample = cardObj.textExample.split(/<b.*?>(.*?)<\/b>/);
   // const textMeaningSplit = cardObj.textMeaning.split(/<i.*?>(.*?)<\/i>/);
  const state = useContext(StateContext);
  for (let i = 0; i < 3; i += 1) {
    console.log(trainGameCard(state.state.auth.userId, state.state.auth.token));
  }

  return (
      <div className={style.cardContainer} id={cardObj.id}>
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
          {prop.answer
          && (
          <p className={style.putDownOnAns}>
            {cardObj.word}
          </p>
          )}
          {settings.explainToCard && settings.exampleToCard
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
                          {'?'.repeat(cardObj.word.length)}
                          {textMeaningSplit[2]}
                        </p>
                      )}
                    </>
                    )}
          {settings.exampleToCard
                    && (
                    <>
                      <p>
                        {textExample[0]}
                        <input size={textExample[1].length} maxLength={textExample[1].length} />
                        {textExample[2]}
                      </p>
                      {prop.answer
                      && <p className={style.putDownOnAns}>{cardObj.textExampleTranslate}</p>}
                    </>
                    )}

          {!settings.explainToCard && !settings.exampleToCard
                    && <input size={textExample[1].length} maxLength={textExample[1].length} />}
          {settings.addGradeButton && prop.answer
                    && (
                    <div className={style.gradeContainer}>
                      <div className={style.easyBtn}>Es</div>
                      <div className={style.mediumBtn}>Md</div>
                      <div className={style.hardBtn}>Hrd</div>
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

