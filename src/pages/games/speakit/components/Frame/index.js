import { DIV, IMG, CustomComponent } from '../../../my_modules/htmlComponents';
import style from './style.css';


/* props = {
     current:,
     mode:,
   }
*/

class Frame extends CustomComponent {
  refresh(newProps) {
    this.props = newProps;
    this.rerender();
  }

  render() {
    const { list } = this.props;
    const current = !Number.isNaN(Number.parseInt(this.props.current, 10))
      ? Number.parseInt(this.props.current, 10)
      : this.props.current;

    const imgSrc = Number.isInteger(current)
      ? `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${list[current].image}`
      : '/assets/blank.jpg';

    let text;
    if (Number.isInteger(current)) {
      text = this.props.isGame ? list[current].word : list[current].translation;
    } else {
      text = current;
    }

    const classRight = Number.isInteger(current) ? 'green-text text-accent-3' : 'red-text text-accent-2';

    return (
      DIV({ className: style.wrapper }, [
        DIV({ className: `z-depth-3 ${style.innerWrapper}` }, [
          IMG({
            className: style.image, src: imgSrc, width: '375px', height: '250px',
          }),
          DIV({ className: `flow-text ${style.textField} ${classRight}` }, [
            text,
          ]),
        ]),
        DIV({ className: style.total }, [
          DIV({}, ['Total']),
          DIV({}, [`${this.props.recognized.length} / 10`]),
        ]),
      ])
    );
  }
}

export default Frame;
