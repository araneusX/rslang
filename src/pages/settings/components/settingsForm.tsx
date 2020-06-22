import React, { useState, useContext } from "react";
import { StateContext } from "../../../store/stateProvider";
import { BackendContext } from "../../../backend/backendProvider";

import style from "./settingsForm.module.scss";

const SettingsForm = () => {
  const { state, dispatch } = useContext(StateContext);
  const { uploadSettings } = useContext(BackendContext);
  const { settings } = state;

  const [setting, setSetting] = useState(settings);
  const [loader, setLoader] = useState(false);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, name } = event.target;
    const newSetting = {
      ...setting,
    };

    switch (name) {
      case "cards-quantity":
        newSetting.wordsPerDay = Number(value);
        break;
      case "words-quantity":
        setting.optional.maxCountCard = Number(value);
        break;
      case "image":
        setting.optional.imageToCard = !setting.optional.imageToCard;
        break;
      case "pronounse":
        setting.optional.pronounseToCard = !setting.optional.pronounseToCard;
        break;
      case "transcription":
        setting.optional.transcriptionToCard = !setting.optional
          .transcriptionToCard;
        break;
      case "translate":
        setting.optional.translateToTheCard = !setting.optional
          .translateToTheCard;
        break;
      case "example":
        setting.optional.exampleToCard = !setting.optional.exampleToCard;
        break;
      case "explain":
        setting.optional.explainToCard = !setting.optional.explainToCard;
        break;
      case "show-answer":
        setting.optional.showAnswerButton = !setting.optional.showAnswerButton;
        break;
      case "delete-button":
        setting.optional.wordDeleteButton = !setting.optional.wordDeleteButton;
        break;
      case "put-into-hard":
        setting.optional.addToDifficultWordsButton = !setting.optional
          .addToDifficultWordsButton;
        break;
      case "grade":
        setting.optional.addGrageButton = !setting.optional.addGrageButton;
        break;
      default:
        break;
    }
    setSetting(newSetting);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    const data = await uploadSettings(
      state.auth.userId,
      state.auth.authToken,
      setting
    );
    if (data) {
      dispatch({ type: "SET_SETTING", value: data });
    }
    setLoader(false);
  };

  return (
    <form className={`${style.settingsForm}`} onSubmit={submitHandler}>
      <fieldset>
        <legend>Quantyty of new words</legend>
        <label htmlFor="cards-quantity">
          <input
            onChange={changeHandler}
            value={setting.wordsPerDay}
            id="cards-quantity"
            type="number"
            name="cards-quantity"
            min="5"
            max="50"
          />
          cards quantity for one day
        </label>
        <br />
        <label htmlFor="words-quantity">
          <input
            onChange={changeHandler}
            value={setting.optional.maxCountCard}
            id="words-quantity"
            type="number"
            name="words-quantity"
            min="5"
            max="50"
          />
          New words quantity
        </label>
        <br />
      </fieldset>
      <fieldset>
        <legend>Cards view</legend>
        <label htmlFor="image">
          <input
            onChange={changeHandler}
            checked={setting.optional.imageToCard}
            id="image"
            type="checkbox"
            name="image"
          />
          <span>Add image to the card</span>
        </label>
        <br />
        <label htmlFor="pronounse">
          <input
            onChange={changeHandler}
            checked={setting.optional.pronounseToCard}
            id="pronounse"
            type="checkbox"
            name="pronounse"
          />
          <span>Add pronounse to the card</span>
        </label>
        <br />
        <label htmlFor="transcription">
          <input
            onChange={changeHandler}
            checked={setting.optional.transcriptionToCard}
            id="transcription"
            type="checkbox"
            name="transcription"
          />
          <span>Add transcription to the card</span>
        </label>
        <br />
        <label htmlFor="translate">
          <input
            onChange={changeHandler}
            checked={setting.optional.translateToTheCard}
            id="translate"
            type="checkbox"
            name="translate"
          />
          <span>Add translate to the card</span>
        </label>
        <br />
        <label htmlFor="example">
          <input
            onChange={changeHandler}
            checked={setting.optional.exampleToCard}
            id="example"
            type="checkbox"
            name="example"
          />
          <span>Add example to the card</span>
        </label>
        <br />
        <label htmlFor="explain">
          <input
            onChange={changeHandler}
            checked={setting.optional.explainToCard}
            id="explain"
            type="checkbox"
            name="explain"
          />
          <span>Add explain to the card</span>
        </label>
        <br />
      </fieldset>
      <fieldset>
        <legend>Control elements</legend>
        <label htmlFor="show-answer">
          <input
            onChange={changeHandler}
            checked={setting.optional.showAnswerButton}
            id="show-answer"
            type="checkbox"
            name="show-answer"
          />
          <span>Add &quot;show answer&quot; button</span>
        </label>
        <br />
        <label htmlFor="delete-button">
          <input
            onChange={changeHandler}
            checked={setting.optional.wordDeleteButton}
            id="delete-button"
            type="checkbox"
            name="delete-button"
          />
          <span>Add &quot;delete&quot; button</span>
        </label>
        <br />
        <label htmlFor="put-into-hard">
          <input
            onChange={changeHandler}
            checked={setting.optional.addToDifficultWordsButton}
            id="put-into-hard"
            type="checkbox"
            name="put-into-hard"
          />
          <span>Add button to put word into hard</span>
        </label>
        <br />
        <label htmlFor="grade">
          <input
            onChange={changeHandler}
            checked={setting.optional.addGrageButton}
            id="grade"
            type="checkbox"
            name="grade"
          />
          <span>Add &quot;grade&quot; buttons</span>
        </label>
        <br />
      </fieldset>
      {loader ? "Loading..." : <input type="submit" value="Save" />}
    </form>
  );
};

export default SettingsForm;
