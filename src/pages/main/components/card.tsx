/* eslint-disable max-len */
import React, { useContext } from 'react';
import style from './card.module.scss';
import { CardInterface, CardSettingsInterface } from '../../../types';
import trainGameCard from './training';
import { StateContext } from '../../../store/stateProvider';

const Card: React.FC<{ cardObj: CardInterface, settings: CardSettingsInterface }> = (prop) => {
  const { cardObj } = prop;
  const { settings } = prop;

  const textMeaning = () => ({ __html: cardObj.textMeaning });
  const getRightWay = (url : string) => `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${url.slice(6)}`;

  const textExample = cardObj.textExample.split(/<b.*?>(.*?)<\/b>/);
  // const textMeaningSplit = cardObj.textMeaning.split(/<i.*?>(.*?)<\/i>/);
  const state = useContext(StateContext);

  return (
    <div className={style.cardContainer} id={cardObj.id}>
      {settings.imageToCard && <img src={getRightWay(prop.cardObj.image)} alt="" />}
      <p>
        {cardObj.word}
        {settings.transcriptionToCard && <span>{cardObj.transcription}</span>}
      </p>
      {settings.translateToTheCard && <p>{cardObj.wordTranslate}</p>}

      {settings.explainToCard && <p dangerouslySetInnerHTML={textMeaning()} />}
      {settings.explainToCard && settings.translateToTheCard && <p>{cardObj.textMeaningTranslate}</p>}
      {/* {settings.exampleToCard && (
        <>
          <p>
            {textMeaningSplit[0]}
            <input size={textMeaningSplit[1].length} maxLength={textMeaningSplit[1].length} />
            {textMeaningSplit[2]}
          </p>
          <p>{cardObj.textMeaningTranslate}</p>
        </>
        )} */}

      {settings.exampleToCard && (
      <p>
        {textExample[0]}
        <input size={textExample[1].length} maxLength={textExample[1].length} />
        {textExample[2]}
      </p>
      )}
      {settings.exampleToCard && settings.translateToTheCard && <p>{cardObj.textExampleTranslate}</p>}
      {!settings.exampleToCard && <input size={textExample[1].length} maxLength={textExample[1].length} />}
    </div>
  );
};

export default Card;
