import React, { useContext, useState, useEffect } from 'react';
import { initialSavannah, StartSavannah, WordForGame } from '../helpers/types';
import { getWords, getManyWordsById } from '../../../../backend/words';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../../types';

interface Props {
  savannah: StartSavannah,
  setSavannah: (val: StartSavannah)=>void
}

const StatisticGame = (props:Props) => {
  const { savannah, setSavannah } = props;
  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const [viewStatistic, setViewStatistic] = useState(false);
  const [allStatistic, setAllStatistic]:any[] = useState([{}]);

  const newGame = async () => {
    const userLearnedWord = statistics.getAllWordsId();

    if (userLearnedWord.length < 20 || savannah.setLevel) {
      const page = Math.floor(Math.random() * (1 - 29 + 1)) + 1;
      const nextWordForGame = await getWords(page, savannah.level);

      setSavannah({
        ...initialSavannah,
        selectPage: page,
        wordForGame: nextWordForGame,
        allAnswerArray: nextWordForGame.map((i:WordForGame) => i.wordTranslate)
      });
    } else {
      await getManyWordsById(userLearnedWord.slice(0, 20)).then((res) => {
        const nextWordForGame = res.content;
        setSavannah({
          ...initialSavannah,
          wordForGame: nextWordForGame,
          allAnswerArray: nextWordForGame.map((i:WordForGame) => i.wordTranslate)
        });
      });
    }
  };

  const repeatGame = async () => {
    const userLearnedWord = statistics.getAllWordsId();

    if (userLearnedWord.length < 20 || savannah.setLevel) {
      const page = savannah.selectPage;
      const nextWordForGame = await getWords(page, savannah.level);

      setSavannah({
        ...initialSavannah,
        wordForGame: nextWordForGame,
        allAnswerArray: nextWordForGame.map((i:WordForGame) => i.wordTranslate)
      });
    } else {
      await getManyWordsById(userLearnedWord.slice(0, 20)).then((res) => {
        const nextWordForGame = res.content;
        setSavannah({
          ...initialSavannah,
          wordForGame: nextWordForGame,
          allAnswerArray: nextWordForGame.map((i:WordForGame) => i.wordTranslate)
        });
      });
    }
  };

  const getStatistics = () => {
    setViewStatistic(true);
  };

  useEffect(() => {
    statistics.saveMini('savannah', savannah.correctAnswer.length).then((res) => {
      const mini = statistics.getMini('savannah');
      setAllStatistic(mini);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {viewStatistic
        ? (
          <div>
            <div>
              {allStatistic.map((obj: { date: string, results: number[]; }) => (
                <div key={obj.date}>
                  date:
                  {obj.date}
                  :
                  <div>
                    results round:
                    {obj.results.map((i:number) => (
                      <span key={i}>
                        {i}
                        ,
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setViewStatistic(false)} type="button">Back</button>
          </div>
        )

        : (
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
              <button onClick={repeatGame} type="button">Повторить раунд</button>
              <button onClick={getStatistics} type="button">Показать статистику</button>
            </div>
          </div>
        )}
    </>
  );
};

export default StatisticGame;