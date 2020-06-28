import {
  DIV, H2, SPAN, I, CustomComponent,
} from '../../../my_modules/htmlComponents';
import stylizeButton from '../../stylizeElements/stylizeButton';
import style from './style.css';

/*
   props = {
      list:
      recognized:
      isResult:
   }
*/
class Results extends CustomComponent {
  constructor(props) {
    super(props);

    this.node.addEventListener('click', (event) => {
      if (event.target.dataset.resultlist || event.target.parentNode.dataset.resultlist) {
        const item = event.target.dataset.resultlist || event.target.parentNode.dataset.resultlist;
        if (!this.props.list[item].audioSrc) {
          this.props.list[item].audioSrc = new Audio(
            `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${this.props.list[item].audio}`,
          );
        }
        this.props.list[item].audioSrc.play();
      }
    });
  }

  refresh(newProps) {
    if (newProps.isResult !== this.props.isResult || this.props.isResult) {
      this.props = newProps;
      this.rerender();
    }
  }

  render() {
    let content = [];
    const innerContent = [];

    if (this.props.isResult) {
      if (this.props.savedShow) {
        let num = 0;
        this.props.list.forEach((item, i) => {
          num += 1;
          const date = new Date(item.gameId);
          const hoursStr = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
          const minsStr = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
          const dateStr = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${hoursStr}:${minsStr}`;
          const level = Number.parseInt(item.level, 10) + 1;
          const page = Number.parseInt(item.page, 10) + 1;

          innerContent.push(
            DIV({ className: `flow-text ${style.item}`, 'data-saved': i }, [
              `${num}. ${dateStr} | Level:${level} | Page:${page} | Total:${item.recognized.length}`,
            ]),
          );
        });
      } else {
        this.props.list.forEach((word, i) => {
          const isRight = this.props.recognized.includes(word.word);
          const item = (
            DIV({ className: `flow-text ${style.item}`, 'data-resultlist': i }, [
              I({
                className: `small material-icons ${isRight ? style.right : style.wrong} ${style.icon}`,
              }, [
                isRight ? 'check' : 'close',
              ]),
              SPAN({ className: style.td }, [word.word]),
              SPAN({ className: style.td }, [word.transcription]),
              SPAN({ className: style.td }, [word.translation]),
              I({ className: `small material-icons ${style.icon}` }, ['volume_up']),
            ])
          );

          if (this.props.recognized.includes(word.word)) {
            innerContent.unshift(item);
          } else {
            innerContent.push(item);
          }
        });
      }

      content = [
        DIV({ className: style.screen }, [
          DIV({ className: `z-depth-2 ${style.message}` }, [
            H2({ className: style.total }, [
              this.props.savedShow ? 'Saved games' : `Result: ${this.props.recognized.length}/10`]),
            DIV({ className: style.container }, [
              ...innerContent,
            ]),
            DIV({ className: style.buttonsWrapper }, [
              stylizeButton({ 'data-action': 'saved' }, ['Saved games']),
              stylizeButton({ 'data-action': 'new' }, ['New game']),
              stylizeButton({ 'data-action': 'return' }, ['Return']),
            ]),
          ]),
        ]),
      ];
    }

    return (
      DIV({ className: style.wrapper }, [
        ...content,
      ])
    );
  }
}

export default Results;
