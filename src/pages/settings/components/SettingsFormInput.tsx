import React from 'react';

const SettingsFormInput = (state: any) => (
  <label htmlFor={state.name}>
    <input
      id={state.name}
      type="checkbox"
      name={state.name}
      value={state.isChecked ? 'on' : 'off'}
      checked={state.isChecked}
    />
    <span>{state.title}</span>
  </label>
);

export default SettingsFormInput;

/*
const ChecboxParameters: {name: string, title: string, value: boolean} = {
  name: 'string',
  title: 'string',
  value: false
};
Add input for cards quantity for one day
Add input for new words quantity
Add input for card settings (image, pronounse, transcription, translate, example sentence, explain sentence)
Checkbox "Add "show answer" button"
Checkbox "Add "delete" button"
Checkbox "Add button to put word into hard"
Checkbox "Add "grade" buttons"
*/
