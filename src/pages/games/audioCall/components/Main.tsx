import React, {
  useContext, useState, useCallback, useMemo
} from 'react';

import style from '../audioCall.module.scss';
import { StateContext } from '../../../../store/stateProvider';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StatisticsInterface, BackendWordInterface } from '../../../../types';
import { getManyWordsById, getWords } from '../../../../backend/words';

const Main = () => {
  const UserWordLevel = 7;
  const levelsSelect = [1, 2, 3, 4, 5, 6, 7];
  const pagesSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const { state, dispatch } = useContext(StateContext);
  const {
    level, page, answer, sound, allAnswerArray, step
  } = state.audioCall;
  const [localLevel, setLocalLevel] = useState(level + 1);
  const [localPage, setLocalPage] = useState(page);
  const userLearnedWord = statistics.getAllWordsId();

  const changePage = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { value } : any = e.target;
    setLocalPage(Number(value));
  };

  const changeLevel = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { value } : any = e.target;
    setLocalLevel(Number(value));
  };

  const setLevel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (localLevel === UserWordLevel && userLearnedWord.length >= 20) {
      const nextWordForGame = await getManyWordsById(userLearnedWord.slice(0, 20));
    } else {
      const sLevel = (localLevel === UserWordLevel) ? 0 : (localLevel - 1);
      const nextWordForGame = await getWords(sLevel, localPage);
    }
  };

  const computeAnswerArray = useCallback(
    (_answer: BackendWordInterface) => {
      let arr = [...allAnswerArray];
      arr.splice(step, 1);
      arr = arr.sort(() => Math.random() - 0.5);
      let answerArr = [_answer && _answer.wordTranslate, ...arr.splice(0, 3)];
      answerArr = answerArr.sort(() => Math.random() - 0.5);
      return answerArr;
    },
    [allAnswerArray, step]
  );

  const answerArray : string[] = useMemo(() => (answer ? computeAnswerArray(answer) : []), [answer, computeAnswerArray]);

  const clickAnswer = (_answer:string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!!answer && answer.wordTranslate === _answer) {
      if (sound) {
        const audio = new Audio('/mp3/cor.mp3');
        audio.play();
      }

      // props.setSavannah({ ...savannah, correctAnswer: [...savannah.correctAnswer, answer] });
    } else {
      // if (sound) {
      //   const audio = new Audio('/mp3/no-otveta.mp3');
      //   audio.play();
      // }

      // props.setSavannah({ ...savannah, life: savannah.life - 1, errorAnswerArray: [...savannah.errorAnswerArray, answer] });
    }
  };

  return (
    <>
      <div className={style.heightAuto}>

        <div className={style.gameMainWrapper}>
          <div className={style.gameMainHead}>
            <div className={style.gameMainLevels}>
              уровень:
              <select name="levelSelect" id="levelSelect" onChange={changeLevel} value={localLevel}>
                {levelsSelect.map((i) => (
                  <option
                    key={i}
                    value={i}
                    disabled={userLearnedWord.length < 20 && i === UserWordLevel}
                  >
                    { i === UserWordLevel ? 'User word' : i}
                  </option>
                ))}
              </select>
              стр.:
              <select name="pageSelect" id="pageSelect" onChange={changePage} value={localPage} disabled={localLevel === UserWordLevel}>
                {pagesSelect.map((i) => (
                  <option
                    key={i}
                    value={i}
                  >
                    {i}
                  </option>
                ))}
              </select>
              <button type="button" onClick={setLevel}>Выбрать</button>
            </div>
          </div>
          <div className={`${style.wordWrapper}`} style={{ top: `${(20)}%` }}>
            {answer && answer.word}
          </div>
          <div className={style.answerBlock}>
            {answerArray.map((i) => (
              <div key={i}>
                <button
                  onClick={(event) => clickAnswer(i, event)}
                  type="button"
                >
                  {i}
                </button>
              </div>
            ))}
          </div>
          <div>
            <button
              type="button"
            >
              Не знаю
            </button>
            <button
              type="button"
            >
              {'--->'}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Main;
