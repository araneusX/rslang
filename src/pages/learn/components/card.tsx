import React from 'react';
import style from './card.module.scss';
import CardInterface from './cardInterface';
import SettingsInterface from './settingsInterface';

const Card: React.FC<{ cardObj: CardInterface, settingsObj: SettingsInterface }> = (props) => {
    
    const cardObj = props.cardObj;
    const settingsObj = props.settingsObj;

    const textMeaning = () => {
        return {__html: cardObj.textMeaning};
    }
    const getRightWay = (url : string) => {
        return 'https://raw.githubusercontent.com/araneusx/rslang-data/master/data/' + url.slice(6);
    }

    const textExample = cardObj.textExample.split(/<b.*?>(.*?)<\/b>/); 
    const textMeaningSplit = cardObj.textMeaning.split(/<i.*?>(.*?)<\/i>/);

    return (
        <>
        <div className={style.cardContainer} id={cardObj.id}>
            {settingsObj.showImage &&
                <img src={getRightWay(props.cardObj.image)}></img>
            }
            <>
                <p>{cardObj.word}
                    {settingsObj.showTranscription &&
                        <span>{cardObj.transcription}</span>
                    }
                </p>
                {settingsObj.showWordTranslation &&
                    <p>{cardObj.wordTranslate}</p>
                }

                {settingsObj.showTextMeaning && settingsObj.showTextExample &&
                    <><p dangerouslySetInnerHTML={textMeaning()}></p>
                    <p>{cardObj.textMeaningTranslate}</p></>
                }

                {settingsObj.showTextMeaning && !settingsObj.showTextExample &&
                    <><p>{textMeaningSplit[0]}
                    <input size={textMeaningSplit[1].length} maxLength={textMeaningSplit[1].length}></input>
                    {textMeaningSplit[2]}</p>
                    <p>{cardObj.textMeaningTranslate}</p></>
                }

                {settingsObj.showTextExample &&
                    <><p>{textExample[0]}
                        <input size={textExample[1].length} maxLength={textExample[1].length}></input>
                        {textExample[2]}</p>
                    <p>{cardObj.textExampleTranslate}</p></>
                }

                {!settingsObj.showTextMeaning && !settingsObj.showTextExample &&
                    <input size={textExample[1].length} maxLength={textExample[1].length}></input>
                }
            </>
        </div>
        </>
    );
};

export default Card;