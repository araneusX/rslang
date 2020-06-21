import React, { useState, useContext } from 'react';
import { StateContext } from '../../../store/stateProvider';
import { BackendContext } from '../../../backend/backendProvider';
import { Settings } from '../../../store/store';

import style from './settingsForm.module.scss';

const SettingsForm = () => {
  const { state, dispatch } = useContext(StateContext);
  const { uploadSettings } = useContext(BackendContext);
  const { settings } = state;

  const { userId } = state.auth;
  const { authToken } = state.auth;

  const [cardsQuantity, setCardsQuantity] = useState(settings.wordsPerDay);
  const [wordsQuantity, setWordsQuantity] = useState(settings.optional.maxCountCard);
  const [imageToCard, setImageToCard] = useState(settings.optional.imageToCard);
  const [pronounseToCard, setPronounseToCardy] = useState(settings.optional.pronounseToCard);
  const [transcriptionToCard, setTranscriptionToCard] = useState(settings.optional.transcriptionToCard);
  const [translateToTheCard, setTranslateToTheCard] = useState(settings.optional.translateToTheCard);
  const [exampleToCard, setExampleToCard] = useState(settings.optional.exampleToCard);
  const [explainToCard, setExplainToCard] = useState(settings.optional.explainToCard);
  const [showAnswerButton, setShowAnswerButton] = useState(settings.optional.showAnswerButton);
  const [wordDeleteButton, setWordDeleteButton] = useState(settings.optional.wordDeleteButton);
  const [addToDifficultWordsButton, setAddToDifficultWordsButton] = useState(settings.optional.addToDifficultWordsButton);
  const [addGrageButton, setAddGrageButton] = useState(settings.optional.addGrageButton);

  const [loader, setLoader] = useState(false);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) : void {
    const { value } = event.target;
    const typeOfInput = event.target.name;
    switch (typeOfInput) {
      case 'cards-quantity':
        setCardsQuantity(Number(value));
        break;
      case 'words-quantity':
        setWordsQuantity(Number(value));
        break;
      case 'image':
        setImageToCard(!imageToCard);
        break;
      case 'pronounse':
        setPronounseToCardy(!pronounseToCard);
        break;
      case 'transcription':
        setTranscriptionToCard(!transcriptionToCard);
        break;
      case 'translate':
        setTranslateToTheCard(!translateToTheCard);
        break;
      case 'example':
        setExampleToCard(!exampleToCard);
        break;
      case 'explain':
        setExplainToCard(!explainToCard);
        break;
      case 'show-answer':
        setShowAnswerButton(!showAnswerButton);
        break;
      case 'delete-button':
        setWordDeleteButton(!wordDeleteButton);
        break;
      case 'put-into-hard':
        setAddToDifficultWordsButton(!addToDifficultWordsButton);
        break;
      case 'grade':
        setAddGrageButton(!addGrageButton);
        break;
      default:
        break;
    }
  }

  const submitHandler = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    const newStetting:Settings = {
      wordsPerDay: cardsQuantity,
      optional: {
        maxCountCard: wordsQuantity,
        imageToCard,
        pronounseToCard,
        transcriptionToCard,
        translateToTheCard,
        exampleToCard,
        explainToCard,
        showAnswerButton,
        wordDeleteButton,
        addToDifficultWordsButton,
        addGrageButton
      }
    };
    const data = await uploadSettings(userId, authToken, newStetting);
    if (data) {
      dispatch({ type: 'SET_SETTING', value: data });
    }
    setLoader(false);
  };

  return (
    <form className={`${style.settingsForm}`} onSubmit={submitHandler}>
      <fieldset>
        <legend>Quantyty of new words</legend>
        <label htmlFor="cards-quantity">
          <input onChange={changeHandler} value={cardsQuantity} id="cards-quantity" type="number" name="cards-quantity" min="5" max="50" />
          cards quantity for one day
        </label>
        <br />
        <label htmlFor="words-quantity">
          <input onChange={changeHandler} value={wordsQuantity} id="words-quantity" type="number" name="words-quantity" min="5" max="50" />
          New words quantity
        </label>
        <br />
      </fieldset>
      <fieldset>
        <legend>Cards view</legend>
        <label htmlFor="image">
          <input onChange={changeHandler} checked={imageToCard} id="image" type="checkbox" name="image" />
          <span>Add image to the card</span>
        </label>
        <br />
        <label htmlFor="pronounse">
          <input onChange={changeHandler} checked={pronounseToCard} id="pronounse" type="checkbox" name="pronounse" />
          <span>Add pronounse to the card</span>
        </label>
        <br />
        <label htmlFor="transcription">
          <input onChange={changeHandler} checked={transcriptionToCard} id="transcription" type="checkbox" name="transcription" />
          <span>Add transcription to the card</span>
        </label>
        <br />
        <label htmlFor="translate">
          <input onChange={changeHandler} checked={translateToTheCard} id="translate" type="checkbox" name="translate" />
          <span>Add translate to the card</span>
        </label>
        <br />
        <label htmlFor="example">
          <input onChange={changeHandler} checked={exampleToCard} id="example" type="checkbox" name="example" />
          <span>Add example to the card</span>
        </label>
        <br />
        <label htmlFor="explain">
          <input onChange={changeHandler} checked={explainToCard} id="explain" type="checkbox" name="explain" />
          <span>Add explain to the card</span>
        </label>
        <br />
      </fieldset>
      <fieldset>
        <legend>Control elements</legend>
        <label htmlFor="show-answer">
          <input onChange={changeHandler} checked={showAnswerButton} id="show-answer" type="checkbox" name="show-answer" />
          <span>Add &quot;show answer&quot; button</span>
        </label>
        <br />
        <label htmlFor="delete-button">
          <input onChange={changeHandler} checked={wordDeleteButton} id="delete-button" type="checkbox" name="delete-button" />
          <span>Add &quot;delete&quot; button</span>
        </label>
        <br />
        <label htmlFor="put-into-hard">
          <input onChange={changeHandler} checked={addToDifficultWordsButton} id="put-into-hard" type="checkbox" name="put-into-hard" />
          <span>Add button to put word into hard</span>
        </label>
        <br />
        <label htmlFor="grade">
          <input onChange={changeHandler} checked={addGrageButton} id="grade" type="checkbox" name="grade" />
          <span>Add &quot;grade&quot; buttons</span>
        </label>
        <br />
      </fieldset>
      {loader
        ? 'Loading...'
        : <input type="submit" value="Save" />}
    </form>
  );
};

export default SettingsForm;
