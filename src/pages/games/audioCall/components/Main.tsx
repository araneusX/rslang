import React, {
  useContext, useState, useCallback, useMemo, useEffect
} from 'react';
import AudioContext from '../audioContext';
import style from '../audioCall.module.scss';
import { StateContext } from '../../../../store/stateProvider';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StatisticsInterface, BackendWordInterface } from '../../../../types';

const Main = () => {
  const UserWordLevel = 6;
  const levelsSelect = [0, 1, 2, 3, 4, 5, 6];
  const pagesSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

  const [buttonClassName, setButtonClassName] = useState('');

  const { getStartWords } = useContext(AudioContext);
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const { state, dispatch } = useContext(StateContext);
  const {
    level, page, allAnswerArray, step, words, correctAnswer, errorAnswer, addAnswer
  } = state.audioCall;
  const [localLevel, setLocalLevel] = useState(level);
  const [localPage, setLocalPage] = useState(page);
  const [localAnswer, setLocalAnswer] = useState('');
  const userLearnedWord = statistics.getAllWordsId();
  const answer : BackendWordInterface = words[step];

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
    const nextWords = await getStartWords(localLevel, localLevel !== UserWordLevel, localPage);
    const allAnswerArr : string[] = nextWords.map((i : BackendWordInterface) => i.wordTranslate);
    dispatch({
      type: 'SET_AUDIO_NEW_GAME',
      value: {
        level: localLevel, words: nextWords, allAnswerArray: allAnswerArr, page: localPage
      }
    });
  };

  const nextStep = () => {
    if (words.length > step + 1) {
      dispatch({ type: 'SET_AUDIO_STEP', value: step + 1 });
    } else {
      dispatch({ type: 'SET_AUDIO_SCREEN', value: 'results' });
    }
  };

  const computeAnswerArray = useCallback(
    (_answer: BackendWordInterface) => {
      let arr = [...allAnswerArray];
      arr.splice(step, 1);
      arr = arr.sort(() => Math.random() - 0.5);
      let answerArr = [_answer && _answer.wordTranslate, ...arr.splice(0, 4)];
      answerArr = answerArr.sort(() => Math.random() - 0.5);
      return answerArr;
    },
    [allAnswerArray, step]
  );

  const answerArray : string[] = useMemo(() => (answer ? computeAnswerArray(answer) : []), [answer, computeAnswerArray]);

  const clickAnswer = async (_answer:string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!addAnswer) {
      if (!!answer && answer.wordTranslate === _answer) {
        dispatch({ type: 'SET_AUDIO_CORRECT_ANSWER', value: { correctAnswer: [...correctAnswer, answer], addAnswer: true, answerType: true } });
        setLocalAnswer(_answer);
        setButtonClassName('correctAnswer');
      } else {
        dispatch({ type: 'SET_AUDIO_ERROR_ANSWER', value: { errorAnswer: [...errorAnswer, answer], addAnswer: true, answerType: true } });
        setLocalAnswer(_answer);
        setButtonClassName('errorAnswer');
      }
    }
  };

  function sound(src: string) {
    const url = `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${src}`;
    const audio = new Audio(url);
    audio.play();
  }

  useEffect(() => {
    if (answer) {
      const url = `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${answer.audio}`;
      const audio = new Audio(url);
      audio.play();
    }
  }, [answer]);

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
                    { i === UserWordLevel ? 'User word' : i + 1}
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
          <div className={`${style.wordWrapper}`}>
            {addAnswer ? (
              <>
                <div>
                  <img
                    className={style.imageWord}
                    src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${answer.image}`}
                    alt="sound_icon"
                  />
                </div>
                {answer.word}
                <img
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="button"
                  className={style.imageBtn}
                  onKeyDown={() => {}}
                  onClick={() => { sound(answer.audio); }}
                  tabIndex={0}
                  src="/images/audio/sound.svg"
                  alt="sound_icon"
                />
              </>

            )
              : (
                <img
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="button"
                  className={style.imageBtn}
                  onKeyDown={() => {}}
                  onClick={() => { sound(answer.audio); }}
                  tabIndex={0}
                  src="/images/audio/sound.svg"
                  alt="sound_icon"
                />
              )}
          </div>
          <div className={style.nextBtnBlock}>
            { addAnswer ? (
              <button
                onClick={(event) => nextStep()}
                type="button"
              >
                {'--->'}
              </button>
            ) : (
              <button
                onClick={(event) => clickAnswer('', event)}
                type="button"
              >
                Не знаю
              </button>
            )}
          </div>
          <div className={style.answerBlock}>
            {answerArray.map((i) => (
              <div key={i}>
                <button
                  className={addAnswer && i === localAnswer ? `${style[buttonClassName]}` : ''}
                  disabled={addAnswer && i !== localAnswer}
                  onClick={(event) => clickAnswer(i, event)}
                  type="button"
                >
                  {i}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default Main;
