import React from 'react';

import style from './settingsForm.module.scss';

const SettingsForm = () => (
  <form className={`${style.settingsForm}`}>
    <fieldset>
      <legend>Quantyty of new words</legend>
      <input id="cards-quantity" type="number" name="cards-quantity" min="5" max="50" defaultValue="10" />
      <label htmlFor="cards-quantity">cards quantity for one day</label>
      <br />
      <input id="words-quantity" type="number" name="words-quantity" min="5" max="50" defaultValue="10" />
      <label htmlFor="words-quantity">New words quantity</label>
      <br />
    </fieldset>
    <fieldset>
      <legend>Cards view</legend>
      <input id="image" type="checkbox" name="image" />
      <label htmlFor="image">Add image to the card</label>
      <br />
      <input id="pronounse" type="checkbox" name="pronounse" />
      <label htmlFor="pronounse">Add pronounse to the card</label>
      <br />
      <input id="transcription" type="checkbox" name="transcription" />
      <label htmlFor="transcription">Add transcription to the card</label>
      <br />
      <input id="translate" type="checkbox" name="translate" />
      <label htmlFor="translate">Add translate to the card</label>
      <br />
      <input id="example" type="checkbox" name="example" />
      <label htmlFor="example">Add example to the card</label>
      <br />
      <input id="explain" type="checkbox" name="explain" />
      <label htmlFor="explain">Add explain to the card</label>
      <br />
    </fieldset>
    <fieldset>
      <legend>Control elements</legend>
      <input id="show-answer" type="checkbox" name="show-answer" />
      <label htmlFor="show-answer">Add &quot;show answer&quot; button</label>
      <br />
      <input id="delete-button" type="checkbox" name="delete-button" />
      <label htmlFor="delete-button">Add &quot;delete&quot; button</label>
      <br />
      <input id="put-into-hard" type="checkbox" name="put-into-hard" />
      <label htmlFor="put-into-hard">Add button to put word into hard</label>
      <br />
      <input id="grade" type="checkbox" name="grade" />
      <label htmlFor="grade">Add &quot;grade&quot; buttons</label>
      <br />
    </fieldset>
  </form>
);

export default SettingsForm;
