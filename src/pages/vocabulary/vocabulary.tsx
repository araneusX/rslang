/* eslint-disable react/no-unescaped-entities */
import React, {
  useState, useEffect, useContext
} from 'react';
import { Preloader } from '../../commonComponents';

import style from './vocabulary.module.scss';
import { getWordsByFilter } from '../../backend/words';
import { StateContext } from '../../store/stateProvider';
import { StatisticsInterface, BackendWordInterface } from '../../types';
import { StatisticsContext } from '../../statistics/statisticsProvider';

type TabType = 'all' | 'difficult' | 'deleted';

type ProgressType = {
  repeatCount: number,
  lastRepeat: string,
  nextRepeat: string,
  total: number
};

type OptionType ={
  deleted: boolean,
  difficult: boolean,
  order: number,
};

type WordObjType = {
  word: BackendWordInterface,
  progress: ProgressType,
  option: OptionType
};

const Vocabulary = () => {
  const { state } = useContext(StateContext);
  const { auth } = state;
  const { wordsPerDay } = state.settings;
  const {
    maxCountCard, exampleToCard, explainToCard, imageToCard, transcriptionToCard
  } = state.settings.optional;

  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const [words, setWords] = useState<WordObjType[]>([]);

  const [tab, setTab] = useState<TabType>('all');
  const handleTabChange = (value: TabType) => setTab(value);

  const handleAudioPlay = (audioSrc: string) => {
    const audio = new Audio(`https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${audioSrc.slice(6)}`);
    audio.play();
  };

  const handleDifficultyToggle = (order: number) => {
    const wordsArr = [...words];
    wordsArr[order].option.difficult = !wordsArr[order].option.difficult;
    setWords(wordsArr);
    statistics.toggleDifficult(wordsArr[order].word.id);
  };

  const handleDeletedToggle = (order: number) => {
    const wordsArr = [...words];
    wordsArr[order].option.deleted = !wordsArr[order].option.deleted;
    setWords(wordsArr);
    statistics.toggleDeleted(wordsArr[order].word.id);
  };

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const result = await getWordsByFilter(auth.userId, auth.token, { isCorrect: true });
      if (!ignore) {
        if (result.ok) {
          const sortedWords = result.content
            .sort((a, b) => (
              a.statistics.interval - b.statistics.interval
            ));
          const preparedWords: WordObjType[] = [];
          const deletedWords: WordObjType[] = [];
          const cardsBalance = statistics.getDayStatistics().cards;
          for (let i = 0; i < sortedWords.length; i += 1) {
            let nextRepeat = Math.ceil((((i + 1) / (wordsPerDay - maxCountCard)) ** 2) * 2);
            if (i + 1 > wordsPerDay - cardsBalance) {
              nextRepeat += 1;
            }
            let nextRepeatMeaning: string;
            switch (nextRepeat) {
              case 1:
                nextRepeatMeaning = 'сегодня';
                break;
              case 2:
                nextRepeatMeaning = 'завтра / на следующий тренировке';
                break;
              default:
                nextRepeatMeaning = `через ${nextRepeat - 2} дней / тренировок`;
                break;
            }

            let total = Math.ceil(sortedWords[i].statistics.interval / 2);
            if (total > 100) {
              total = 100;
            }
            const resultWord = {
              word: sortedWords[i].word,
              progress: {
                repeatCount: sortedWords[i].statistics.allShow,
                lastRepeat: sortedWords[i].statistics.lastRight,
                nextRepeat: nextRepeatMeaning,
                total
              },
              option: {
                deleted: sortedWords[i].statistics.isDeleted,
                difficult: sortedWords[i].statistics.isDifficult,
                order: 0
              }
            };

            if (resultWord.option.deleted) {
              deletedWords.push(resultWord);
            } else {
              preparedWords.push(resultWord);
            }
          }
          preparedWords.push(...deletedWords);
          for (let i = 0; i < preparedWords.length; i += 1) {
            preparedWords[i].option.order = i;
          }
          setWords(preparedWords);
        } else {
          console.log('BACKEND ERROR: Speak It');
        }
      }
    }
    fetchData();
    return () => { ignore = true; };
  }, []);

  let selectedWords: WordObjType[] = [];

  if (tab === 'difficult') {
    selectedWords = words.filter((word) => word.option.difficult && !word.option.deleted);
  } else if (tab === 'deleted') {
    selectedWords = words.filter((word) => word.option.deleted);
  } else {
    selectedWords = words;
  }

  return (
    <div className={style.container}>
      <div className={style.buttonWrapper}>
        <button
          className={tab === 'all' ? style.activeTab : style.passiveTab}
          type="button"
          onClick={handleTabChange.bind(null, 'all')}
        >
          Все изучаемые слова
        </button>
        <button
          className={tab === 'difficult' ? style.activeTab : style.passiveTab}
          type="button"
          onClick={handleTabChange.bind(null, 'difficult')}
        >
          Сложные слова
        </button>
        <button
          className={tab === 'deleted' ? style.activeTab : style.passiveTab}
          type="button"
          onClick={handleTabChange.bind(null, 'deleted')}
        >
          Удаленные слова
        </button>
      </div>
      <div className={style.table}>
        {selectedWords.length > 0 && (
          <div className={style.words}>
            {selectedWords.map((word) => (
              <div className={style.row} key={word.word.id}>
                <div className={style.word_wrapper}>
                  <div
                    className={style.word_first}
                    onClick={handleAudioPlay.bind(null, word.word.audio)}
                    role="button"
                    onKeyUp={handleAudioPlay.bind(null, word.word.audio)}
                    tabIndex={0}
                  >
                    <div className={style.word_name}>{word.word.word}</div>
                    <img src={`${process.env.PUBLIC_URL}/images/sound1.png`} alt="play" />
                  </div>
                  {word.option.difficult
                    ? (
                      <div className={style.word_option}>
                        <span>Это слово помещено в "сложные".</span>
                        <button
                          className={style.word_option_button}
                          type="button"
                          onClick={handleDifficultyToggle.bind(null, word.option.order)}
                        >
                          Отменить
                        </button>
                      </div>
                    )
                    : (
                      <button
                        className={style.word_option_button}
                        type="button"
                        onClick={handleDifficultyToggle.bind(null, word.option.order)}
                      >
                        Поместить в "сложные"
                      </button>
                    )}
                  {tab !== 'difficult' && (word.option.deleted
                    ? (
                      <div className={style.word_option}>
                        <span>Это слово удалено из списка изучаемых слов</span>
                        <button
                          className={style.word_option_button}
                          type="button"
                          onClick={handleDeletedToggle.bind(null, word.option.order)}
                        >
                          Восстановить
                        </button>
                      </div>
                    )
                    : (
                      <button
                        className={style.word_option_button}
                        type="button"
                        onClick={handleDeletedToggle.bind(null, word.option.order)}
                      >
                        Удалить из списка изучения
                      </button>
                    ))}

                </div>
                <div className={style.word_description}>
                  <div className={style.word_translate}>{word.word.wordTranslate}</div>
                  {transcriptionToCard && <div className={style.word_transcription}>{word.word.transcription}</div>}
                  {explainToCard && <div className={style.word_explain} dangerouslySetInnerHTML={{ __html: word.word.textMeaning }} />}
                  {exampleToCard && <div className={style.word_example} dangerouslySetInnerHTML={{ __html: word.word.textExample }} />}
                  {imageToCard && (
                    <img
                      className={style.word_image}
                      src={`https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${word.word.image.slice(6)}`}
                      alt={word.word.word}
                      height="260px"
                      width="390px"
                    />
                  )}
                </div>
                <div className={style.word_progress}>
                  <div className={style.progress_total}>{`Прогресс изучения слова ${word.progress.total}%.`}</div>
                  <div className={style.progress_count}>{`Это слово повторялось ${word.progress.repeatCount} раз(а).`}</div>
                  <div className={style.progress_last}>{`Последнее повторение ${word.progress.lastRepeat}.`}</div>
                  <div className={style.progress_next}>
                    {word.option.deleted ? 'Слово исключено из списка на повторение.' : `Следующее повторение - ${word.progress.nextRepeat}.`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedWords.length === 0 && (
          <div className={style.empty}>
            {tab === 'all' ? 'Загрузка словаря, подождите...' : 'В данной категории нет слов'}
          </div>
        )}
      </div>
      {selectedWords.length === 0 && (
      <div className={style.preloader_wrapper}>
        <Preloader />
      </div>
      )}
    </div>
  );
};

export default Vocabulary;
