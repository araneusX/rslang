import levelOne from './level1';
import levelTwo from './level2';
import levelThree from './level3';
import levelFour from './level4';
import levelFive from './level5';
import levelSix from './level6';

export default (num) => {
  switch (num) {
    case 0:
      return levelOne;
    case 1:
      return levelTwo;
    case 2:
      return levelThree;
    case 3:
      return levelFour;
    case 4:
      return levelFive;
    default:
      return levelSix;
  }
};
