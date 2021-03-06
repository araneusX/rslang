import React, { useState } from 'react';

function Prompts() {
  const [disabledAudio, setAudio] = useState('');
  function handleAudio() {
    if (!disabledAudio) {
      setAudio('disabled');
    } else {
      setAudio('');
    }
  }
  const [disabledTranslate, setTranslate] = useState('');
  function handleTranslate() {
    if (!disabledTranslate) {
      setTranslate('disabled');
    } else {
      setTranslate('');
    }
  }
  const [disabledVolume, setVolume] = useState('');
  function handleVolume() {
    if (!disabledVolume) {
      setVolume('disabled');
    } else {
      setVolume('');
    }
  }
  const [disabledImageCard, setImageCard] = useState('');
  function handleImageCard() {
    if (!disabledImageCard) {
      setImageCard('disabled');
    } else {
      setImageCard('');
    }
  }

  return (
    <div className="wrapper-prompt">
      <button type="button" aria-label="audio-prompt" onClick={handleAudio} className={`audio-prompt prompt ${disabledAudio}`} title="вкл / выкл аудио подсказку" />
      <button type="button" aria-label="translate-prompt" onClick={handleTranslate} className={`translate-prompt prompt ${disabledTranslate}`} title="вкл / выкл подсказку с перевод" />
      <button type="button" aria-label="volume-prompt" onClick={handleVolume} className={`volume-prompt prompt ${disabledVolume}`} title="вкл / выкл звуковую подсказку" />
      <button type="button" aria-label="image-card-prompt" onClick={handleImageCard} className={`image-card-prompt prompt ${disabledImageCard}`} title="вкл / выкл подсказку с картиной" />
    </div>
  );
}

export default Prompts;
