import React from 'react';
import { initialSavannah } from '../helpers/types';
import { getWords } from '../../../../backend/words';

interface Props {
  savannah: {[key:string]: any},
  setSavannah: any
}

const StatisticGame = (props:Props) => {
  const { savannah, setSavannah } = props;

  const newGame = async () => {
    const userLearnedWord: any = [];

    let nextWordForGame = userLearnedWord;
    if (userLearnedWord.length < 20) {
      let stateMiniGame: any = localStorage.getItem('stateMiniGame');
      stateMiniGame = JSON.parse(stateMiniGame);
      const { level, page } = stateMiniGame.savannah;

      nextWordForGame = await getWords(page, level);

      stateMiniGame = {
        ...stateMiniGame,
        savannah: {
          level: page === 29 ? level + 1 : level,
          page: page === 29 ? 1 : page + 1
        }
      };

      localStorage.setItem('stateMiniGame', JSON.stringify(stateMiniGame));
    }

    setSavannah({
      ...initialSavannah,
      wordForGame: nextWordForGame,
      allAnswerArray: nextWordForGame.map((i:any) => i.wordTranslate)
    });
  };

  return (
    <div>
      <div>
        Words Learned Faithfully:
        { savannah.correctAnswer.length }
        Words Learning:
        { savannah.errorAnswerArray.length }
      </div>
      <div>
        <div>
          Know:
          {savannah.correctAnswer.map((i:string) => (
            <li key={i}>{i}</li>
          ))}
        </div>
        <div>
          Errors:
          {savannah.errorAnswerArray.map((i:string) => (
            <li key={i}>{i}</li>
          ))}
        </div>
      </div>
      <div>
        <button onClick={newGame} type="button">Продолжить тренеровку</button>
      </div>
    </div>
  );
};

export default StatisticGame;
