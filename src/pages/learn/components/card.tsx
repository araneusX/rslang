import React from 'react';
import style from './card.module.scss';
import CardInterface from './cardInterface';

const Card: React.FC<{ cardObj: CardInterface }> = (props) => {
    const cardObj = props.cardObj;

    const textMeaning = () => {
        return {__html: cardObj.textMeaning};
    }
    const textExample = () => {
        return {__html: cardObj.textExample};
    }

    return (
        <>
            <div className={style.cardContainer} id={cardObj.id}>
                <img src={cardObj.image}></img>
                <p>{cardObj.word} <span>{cardObj.transcription}</span></p>
                <p>{cardObj.wordTranslate}</p>

                <p dangerouslySetInnerHTML={textMeaning()}></p>
                <p>{cardObj.textMeaningTranslate}</p>

                <p dangerouslySetInnerHTML={textExample()}></p>
                <p>{cardObj.textExampleTranslate}</p>
                
                <audio src={cardObj.audio}/>
                <audio src={cardObj.audioMeaning}/>
                <audio src={cardObj.audioExample}/>
                <input size={cardObj.wordTranslate.length}></input>
            </div>
        </>
    );
};

export default Card;