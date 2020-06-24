export interface SettingsInterface {
  showTranscription: boolean,
  showWordTranslation: boolean,
  showImage: boolean,
  showTextMeaning: boolean,
  showTextExample: boolean,
}

const settingsObj: SettingsInterface[] = [
  {
    showTranscription: true,
    showWordTranslation: true,
    showImage: true,
    showTextMeaning: true,
    showTextExample: true
  },
  {
    showTranscription: true,
    showWordTranslation: true,
    showImage: true,
    showTextMeaning: false,
    showTextExample: true
  },
  {
    showTranscription: true,
    showWordTranslation: true,
    showImage: true,
    showTextMeaning: true,
    showTextExample: false
  },
  {
    showTranscription: true,
    showWordTranslation: true,
    showImage: true,
    showTextMeaning: false,
    showTextExample: false
  }
];

export default settingsObj;
