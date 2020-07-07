function isDisabledAudio() {
  const isDisabled = document.querySelector('.audio-prompt')?.classList.contains('disabled');
  if (isDisabled) {
    return 'pronunciation-audio prompt-responsive opacity-clear-zero';
  }
  return 'pronunciation-audio prompt-responsive';
}

function isDisabledText() {
  const isDisabled = document.querySelector('.translate-prompt')?.classList.contains('disabled');
  if (isDisabled) {
    return 'pronunciation-text opacity-clear-zero';
  }
  return 'pronunciation-text';
}

export { isDisabledAudio, isDisabledText };
