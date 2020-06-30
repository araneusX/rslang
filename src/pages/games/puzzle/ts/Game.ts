// import React from 'react';
import getLevelImage from '../assets/data_paintings/getLevel';

interface Response {
  audio: string,
  audioMeaning: string,
  audioExample: string,
  group: number,
  id: string,
  image: string,
  page: number,
  textExample: string,
  textExampleTranslate: string
  textMeaning: string,
  textMeaningTranslate: string,
  transcription: string,
  word: string,
  wordTranslate: string,
  wordsPerExampleSentence: number,
}

interface Images {
  id: string,
  name: string,
  imageSrc: string,
  cutSrc: string,
  author: string,
  year: string
}

export interface SentenceNode {
  textExampleTranslate: string;
  sentenceText: string,
  words: string[],
  path: string,
  audio: HTMLAudioElement,
  sentenceAudio: string,
}

export interface GameNode {
  data: Response[];
  level: number;
  page: number;
  nextLevel: number;
  nextPage: number;
  levelImages: Images[];
  pageImage: Images;
  sentences: SentenceNode[];
}

export class Game {
  data: Response[];

  level: number;

  page: number;

  nextLevel: number;

  nextPage: number;

  levelImages: Images[];

  pageImage: Images;

  sentences: SentenceNode[];

  puzzle: any;

  assembledPuzzle: any;

  constructor(data: Response[]) {
    this.data = data;

    this.level = this.data[0].group;
    this.page = this.data[0].page;
    this.nextLevel = this.page === 29 ? (this.level + 1) % 6 : this.level;
    this.nextPage = (this.page + 1) % 30;

    this.levelImages = getLevelImage(this.level);
    this.pageImage = this.levelImages[this.page];
    const sentences: SentenceNode[] = [];
    this.data.sort(() => Math.random() - 0.5);
    this.data.forEach((value) => {
      const sentenceNode: SentenceNode = {
        sentenceText: '',
        words: [],
        path: '',
        textExampleTranslate: '',
        audio: new Audio(),
        sentenceAudio: ''
      };
      const sentenceText = value.textExample.replace(/<b>|<\/b>/g, '');
      const { textExampleTranslate } = value;
      const sentence = sentenceText.split(' ');
      if (sentence.length < 11 && sentences.length < 10) {
        const path = `https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/${value.audioExample.replace('files', 'data')}`;

        sentenceNode.sentenceText = sentenceText;
        sentenceNode.textExampleTranslate = textExampleTranslate;
        sentenceNode.words = sentence;
        sentenceNode.path = path;
        sentenceNode.audio = new Audio(path);
        sentenceNode.sentenceAudio = value.audioExample;
        sentences.push(sentenceNode);
      }
    });
    this.sentences = sentences;
  }
}
