import React from 'react';

import style from './settingsForm.module.scss';
import SettingsFormInput from './SettingsFormInput';

type ChecboxParameters = {name: string, title: string, isChecked: boolean};

const addImage: ChecboxParameters = {
  name: 'image',
  title: 'Add image to the card',
  isChecked: false
};

const SettingsForm = () => (
  <form className={`${style.settingsForm}`}>
    <SettingsFormInput state={addImage} />
  </form>
);

export default SettingsForm;

/* <input type="number" name ="cards-quantity">cards quantity for one day</input>
    <input type="number" name ="words-quantity">new words quantity</input>
    <fieldset>
      <input type="checkbox" name="image">Add image to the card</input>
      <input type="checkbox" name="pronounse">Add pronounse to the card</input>
      <input type="checkbox" name="transcription">Add transcription to the card</input>
      <input type="checkbox" name="translate">Add translate to the card</input>
      <input type="checkbox" name="example">Add example sentence to the card</input>
      <input type="checkbox" name="explain">Add explain sentence to the card</input>
    </fieldset>
    <input type="checkbox" name="show-answer">Add "show answer" button</input>
    <input type="checkbox" name="delete-button">Add "delete" button</input>
    <input type="checkbox" name="put-into-hard">Add button to put word into hard</input>
    <input type="checkbox" name="grade">Add "grade" buttons</input> */
/*
Add input for cards quantity for one day
Add input for new words quantity
Add input for card settings (image, pronounse, transcription, translate, example sentence, explain sentence)
Checkbox "Add "show answer" button"
Checkbox "Add "delete" button"
Checkbox "Add button to put word into hard"
Checkbox "Add "grade" buttons"
*/
