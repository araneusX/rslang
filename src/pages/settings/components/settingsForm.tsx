import React, { useState, useContext } from 'react';
import { StateContext } from '../../../store/stateProvider';

import style from './settingsForm.module.scss';
import { setSettings } from '../../../backend/user';
import Preloader from '../../../commonComponents/preloader/preloader';

const SettingsForm = () => {
  const { state, dispatch } = useContext(StateContext);
  const { settings } = state;

  const [setting, setSetting] = useState(settings);
  const [loader, setLoader] = useState(false);
  const levelsArray: number[] = [0, 1, 2, 3, 4, 5];

  function changeLevel(event: React.ChangeEvent<HTMLSelectElement>):void {
    const { value } = event.target;
    const newSetting = {
      ...setting
    };
    setting.optional.level = Number(value);
    setSetting(newSetting);
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, name } = event.target;
    const newSetting = {
      ...setting
    };

    const arrayCardViewSettings = [
      { key: 'translate', value: setting.optional.translateToTheCard },
      { key: 'example', value: setting.optional.exampleToCard },
      { key: 'explain', value: setting.optional.explainToCard }
    ];
    const arrayCardViewSettingsLength = arrayCardViewSettings.filter((i) => i.value);

    switch (name) {
      case 'cards-quantity':
        if (Number(value) < newSetting.optional.maxCountCard) {
          newSetting.optional.maxCountCard = Number(value);
        }
        newSetting.wordsPerDay = Number(value);
        break;
      case 'words-quantity':
        if (Number(value) > newSetting.wordsPerDay) break;
        newSetting.optional.maxCountCard = Number(value);
        break;
      case 'image':
        newSetting.optional.imageToCard = !setting.optional.imageToCard;
        break;
      case 'transcription':
        newSetting.optional.transcriptionToCard = !setting.optional
          .transcriptionToCard;
        break;
      case 'translate':
        if (arrayCardViewSettingsLength.length === 1 && arrayCardViewSettingsLength[0].key === name) break;
        newSetting.optional.translateToTheCard = !setting.optional
          .translateToTheCard;
        break;
      case 'example':
        if (arrayCardViewSettingsLength.length === 1 && arrayCardViewSettingsLength[0].key === name) break;
        newSetting.optional.exampleToCard = !setting.optional.exampleToCard;
        break;
      case 'explain':
        if (arrayCardViewSettingsLength.length === 1 && arrayCardViewSettingsLength[0].key === name) break;
        newSetting.optional.explainToCard = !setting.optional.explainToCard;
        break;
      case 'show-answer':
        newSetting.optional.showAnswerButton = !setting.optional.showAnswerButton;
        break;
      case 'delete-button':
        newSetting.optional.wordDeleteButton = !setting.optional.wordDeleteButton;
        break;
      case 'put-into-hard':
        newSetting.optional.addToDifficultWordsButton = !setting.optional
          .addToDifficultWordsButton;
        break;
      case 'grade':
        newSetting.optional.addGrageButton = !setting.optional.addGrageButton;
        break;
      default:
        break;
    }
    setSetting(newSetting);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    const setRes = await setSettings(
      state.auth.userId,
      state.auth.token,
      setting
    );
    if (setRes.ok) {
      dispatch({ type: 'SET_SETTINGS', value: setting });
      setLoader(false);
    }
  };

  return (
    <form className={`${style.settingsForm}`} onSubmit={submitHandler}>
      <fieldset className={style['learning-border']}>
        <legend className={style['learning-title']}>
          Настройки
          <br />
          обучения
        </legend>
        <div className={style['wrapper-learning']}>
          <label className={style['learning-label']} htmlFor="cards-quantity">
            <input
              className={style['learning-input']}
              onChange={changeHandler}
              value={setting.wordsPerDay}
              id="cards-quantity"
              type="number"
              name="cards-quantity"
              min="5"
              max="50"
            />
            <p className={style['learning-day']}>Количество карточек в день:</p>
          </label>
          <label className={style['learning-label']} htmlFor="words-quantity">
            <input
              className={style['learning-input']}
              onChange={changeHandler}
              value={setting.optional.maxCountCard}
              id="words-quantity"
              type="number"
              name="words-quantity"
              min="5"
              max="50"
            />
            <p className={style['learning-day']}>Количество новых слов в день:</p>
          </label>
          <label className={style['learning-label']} htmlFor="level">
            <select className={style['learning-level']} name="level" id="level" value={setting.optional.level} onChange={changeLevel}>
              {levelsArray.map((level) => <option key={level} value={level}>{level + 1}</option>)}
            </select>
            <p className={style['learning-day']}>Уровень:</p>
          </label>
        </div>
      </fieldset>
      <div className={style['wrapper-main-setting']}>
        <fieldset className={style['card-border']}>
          <legend className={style['learning-title']}>Настройки карточки</legend>
          <p className={style['card-day']}>На карточке отображать:</p>
          <div className={style['wrapper-label']}>
            <label htmlFor="image">
              <input
                onChange={changeHandler}
                checked={setting.optional.imageToCard}
                id="image"
                type="checkbox"
                name="image"
              />
              <span>Картинка с ассоциацией</span>
            </label>
            <label htmlFor="transcription">
              <input
                onChange={changeHandler}
                checked={setting.optional.transcriptionToCard}
                id="transcription"
                type="checkbox"
                name="transcription"
              />
              <span>Транскрипция</span>
            </label>
            <label htmlFor="translate">
              <input
                onChange={changeHandler}
                checked={setting.optional.translateToTheCard}
                id="translate"
                type="checkbox"
                name="translate"
              />
              <span>Перевод слова</span>
            </label>
            <label htmlFor="example">
              <input
                onChange={changeHandler}
                checked={setting.optional.exampleToCard}
                id="example"
                type="checkbox"
                name="example"
              />
              <span>Предложение с примером применения слова</span>
            </label>
            <label htmlFor="explain">
              <input
                onChange={changeHandler}
                checked={setting.optional.explainToCard}
                id="explain"
                type="checkbox"
                name="explain"
              />
              <span>Предложение с объяснением слова</span>
            </label>
          </div>
        </fieldset>
        <fieldset className={style['control-border']}>
          <legend className={style['learning-title']}>Дополнительные настройки</legend>
          <p className={style['card-day']}>Включить:</p>
          <div className={style['wrapper-control']}>
            <label htmlFor="show-answer">
              <input
                onChange={changeHandler}
                checked={setting.optional.showAnswerButton}
                id="show-answer"
                type="checkbox"
                name="show-answer"
              />
              <span>Просмотр правильного ответа</span>
            </label>
            <label htmlFor="delete-button">
              <input
                onChange={changeHandler}
                checked={setting.optional.wordDeleteButton}
                id="delete-button"
                type="checkbox"
                name="delete-button"
              />
              <span>Удаление хорошо изученные слова из колоды слова</span>
            </label>
            <label htmlFor="put-into-hard">
              <input
                onChange={changeHandler}
                checked={setting.optional.addToDifficultWordsButton}
                id="put-into-hard"
                type="checkbox"
                name="put-into-hard"
              />
              <span>Добавление слова в раздел словаря “сложное”</span>
            </label>
            <label htmlFor="grade">
              <input
                onChange={changeHandler}
                checked={setting.optional.addGrageButton}
                id="grade"
                type="checkbox"
                name="grade"
              />
              <span>Оценка сложности слова</span>
            </label>
          </div>
          <p className={style.recommendation}>Рекомендация: для более эффективного обучения, включите оценку сложности слова.</p>
        </fieldset>
      </div>
      {loader ? <Preloader /> : <input className={style['input-save']} type="submit" value="Сохранить" />}
    </form>
  );
};

export default SettingsForm;
