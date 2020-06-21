import React from 'react';

import style from './settingsForm.module.scss';

const SettingsForm = () => (
  <form className={`${style.settingsForm}`}>
    <fieldset>
      <legend>Quantyty of new words</legend>
      <label htmlFor="cards-quantity">
        <input id="cards-quantity" type="number" name="cards-quantity" min="5" max="50" defaultValue="10" />
        cards quantity for one day
      </label>
      <br />
      <label htmlFor="words-quantity">
        <input id="words-quantity" type="number" name="words-quantity" min="5" max="50" defaultValue="10" />
        New words quantity
      </label>
      <br />
    </fieldset>
    <fieldset>
      <legend>Cards view</legend>
      <label htmlFor="image">
        <input id="image" type="checkbox" name="image" />
        <span>Add image to the card</span>
      </label>
      <br />
      <label htmlFor="pronounse">
        <input id="pronounse" type="checkbox" name="pronounse" />
        <span>Add pronounse to the card</span>
      </label>
      <br />
      <label htmlFor="transcription">
        <input id="transcription" type="checkbox" name="transcription" />
        <span>Add transcription to the card</span>
      </label>
      <br />
      <label htmlFor="translate">
        <input id="translate" type="checkbox" name="translate" />
        <span>Add translate to the card</span>
      </label>
      <br />
      <label htmlFor="example">
        <input id="example" type="checkbox" name="example" />
        <span>Add example to the card</span>
      </label>
      <br />
      <label htmlFor="explain">
        <input id="explain" type="checkbox" name="explain" />
        <span>Add explain to the card</span>
      </label>
      <br />
    </fieldset>
    <fieldset>
      <legend>Control elements</legend>
      <label htmlFor="show-answer">
        <input id="show-answer" type="checkbox" name="show-answer" />
        <span>Add &quot;show answer&quot; button</span>
      </label>
      <br />
      <label htmlFor="delete-button">
        <input id="delete-button" type="checkbox" name="delete-button" />
        <span>Add &quot;delete&quot; button</span>
      </label>
      <br />
      <label htmlFor="put-into-hard">
        <input id="put-into-hard" type="checkbox" name="put-into-hard" />
        <span>Add button to put word into hard</span>
      </label>
      <br />
      <label htmlFor="grade">
        <input id="grade" type="checkbox" name="grade" />
        <span>Add &quot;grade&quot; buttons</span>
      </label>
      <br />
    </fieldset>
  </form>
);

export default SettingsForm;
