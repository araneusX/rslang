import {
  DIV, SPAN, I, CustomComponent,
} from '../../../my_modules/htmlComponents';
import stylizeWord from '../../stylizeElements/stylizeWord';
import style from './style.css';

/*
   props = {
      list:
      mode:
      recognized:
   }
*/
class Words extends CustomComponent {
  refresh(newProps) {
    if (newProps.isGame !== this.props.isGame) {
      if (newProps.isGame) {
        this.content.forEach((element) => {
          element.node.classList.remove(style.train);
          element.node.classList.remove('waves-effect');
          element.node.classList.remove(style.recognized);
        });
      } else {
        this.content.forEach((element) => {
          element.node.classList.add(style.train);
          element.node.classList.add('waves-effect');
          element.node.classList.remove(style.recognized);
        });
      }
    } else if (this.props.isGame) {
      this.props.list.forEach((word, i) => {
        if (newProps.recognized.includes(word.word)) {
          this.content[i].node.classList.add(style.recognized);
        }
      });
    } else if (this.props.current !== newProps.current) {
      if (!Number.isNaN(Number.parseInt(this.props.current, 10))) {
        this.content[this.props.current].node.classList.remove(style.recognized);
      }
      if (!Number.isNaN(Number.parseInt(newProps.current, 10))) {
        this.content[newProps.current].node.classList.add(style.recognized);
      }
    }

    this.props = newProps;
  }

  render() {
    this.content = this.props.list.map((word, i) => {
      const item = stylizeWord({ 'data-current': i }, [
        SPAN({}, [word.word]),
        SPAN({}, [word.transcription]),
        I({ className: `material-icons ${style.icon}` }, ['volume_up']),
      ]);

      if (!this.props.isGame) {
        item.node.classList.add(style.train);
        item.node.classList.remove('waves-effect');
      } else if (this.props.recognized.includes(word.word)) {
        item.node.classList.add(style.recognized);
      }

      return item;
    });

    return (
      DIV({ className: style.wrapper }, [
        ...this.content,
      ])
    );
  }
}

export default Words;
