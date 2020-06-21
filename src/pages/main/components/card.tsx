import React from 'react';
import style from './card.module.scss';
import { CardInterface } from '../../../types';
import { SettingsInterface } from '../../../mosk/testSettingsObj';

const Card: React.FC<{ cardObj: CardInterface, settingsObj: SettingsInterface }> = (prop) => {
  const { cardObj } = prop;
  const { settingsObj } = prop;

  const textMeaning = () => ({ __html: cardObj.textMeaning });
  const getRightWay = (url : string) => `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${url.slice(6)}`;

  const textExample = cardObj.textExample.split(/<b.*?>(.*?)<\/b>/);
  const textMeaningSplit = cardObj.textMeaning.split(/<i.*?>(.*?)<\/i>/);

  return (
    <>
      <div className={style.cardContainer} id={cardObj.id}>
        {settingsObj.showImage
                && <img src={getRightWay(prop.cardObj.image)} alt="" />}
        <>
          <p>
            {cardObj.word}
            {settingsObj.showTranscription
                        && <span>{cardObj.transcription}</span>}
          </p>
          {settingsObj.showWordTranslation
                    && <p>{cardObj.wordTranslate}</p>}

          {settingsObj.showTextMeaning && settingsObj.showTextExample
                    && (
                    <>
                      <p dangerouslySetInnerHTML={textMeaning()} />
                      <p>{cardObj.textMeaningTranslate}</p>
                    </>
                    )}

          {settingsObj.showTextMeaning && !settingsObj.showTextExample
                    && (
                    <>
                      <p>
                        {textMeaningSplit[0]}
                        <input size={textMeaningSplit[1].length} maxLength={textMeaningSplit[1].length} />
                        {textMeaningSplit[2]}
                      </p>
                      <p>{cardObj.textMeaningTranslate}</p>
                    </>
                    )}

          {settingsObj.showTextExample
                    && (
                    <>
                      <p>
                        {textExample[0]}
                        <input size={textExample[1].length} maxLength={textExample[1].length} />
                        {textExample[2]}
                      </p>
                      <p>{cardObj.textExampleTranslate}</p>
                    </>
                    )}

          {!settingsObj.showTextMeaning && !settingsObj.showTextExample
                    && <input size={textExample[1].length} maxLength={textExample[1].length} />}
        </>
      </div>
    </>
  );
};

export default Card;
