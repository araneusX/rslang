type OnGetResultFunctionType = (result: string[]) => any;

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

const { webkitSpeechRecognition } : IWindow = window as unknown as IWindow;

export default class Recognition {
  private recognition: SpeechRecognition | undefined;

  private onGetResult: OnGetResultFunctionType = () => {};

  isStart: boolean = false;

  constructor() {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Sorry you require a browser that supports speech recognition');
      this.startAndDo = () => {};
      this.stop = () => {};
    } else {
      // eslint-disable-next-line new-cap
      this.recognition = new webkitSpeechRecognition() as SpeechRecognition;
      this.recognition.continuous = true;
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 10;

      this.isStart = false;

      this.recognition.addEventListener('end', () => {
        if (this.isStart && this.recognition) {
          this.recognition.start();
        }
      });
    }
  }

  private onResult(event: SpeechRecognitionEvent) {
    const resultsArr: string[] = [];
    Array.from(event.results[event.results.length - 1]).forEach((result) => {
      const words = result.transcript.split(' ');
      words.forEach((word) => {
        if (!resultsArr.includes(word.toLowerCase())
            && word.length > 0
            && Number.isNaN(Number.parseInt(word, 10))
        ) {
          resultsArr.push(word.toLowerCase());
        }
      });
    });

    try {
      this.onGetResult(resultsArr);
    } catch (e) {
      console.log(e);
      if (this.recognition) {
        this.recognition.stop();
      }
    }
  }

  startAndDo(onGetResult: OnGetResultFunctionType) {
    if (this.recognition) {
      this.onGetResult = onGetResult;
      this.recognition.start();
      this.recognition.addEventListener('result', (e) => this.onResult(e));
    }
    this.isStart = true;
  }

  stop() {
    if (this.isStart) {
      this.isStart = false;
      if (this.recognition) {
        this.recognition.removeEventListener('result', (e) => this.onResult(e));
        this.recognition.stop();
      }
    }
  }
}
