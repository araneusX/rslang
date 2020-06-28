import {
  DIV, UL, LI, SPAN, A, CustomComponent,
} from '../../../my_modules/htmlComponents';
import style from './style.css';

/* props = {
    level:,
    page:,
  }
*/
class Navigation extends CustomComponent {
  render() {
    const pages = [];
    const levels = [];

    for (let i = 0; i < 6; i += 1) {
      levels.push(
        LI({ className: `z-depth-1 waves-effect ${style.item}`, 'data-level': i }, [`${i + 1}`]),
      );
    }

    for (let i = 0; i < 60; i += 1) {
      pages.push(
        LI({ className: `z-depth-1 waves-effect ${style.item}`, 'data-page': i }, [`${i + 1}`]),
      );
    }

    pages[this.props.page].node.classList.add(style.current);
    levels[this.props.level].node.classList.add(style.current);


    return (
      DIV({ className: style.wrapper }, [
        DIV({ className: style.row }, [
          SPAN({ className: style.title }, ['LEVEL:']),
          UL({ className: style.ul }, levels),
        ]),
        DIV({ className: 'divider' }),
        DIV({ className: style.row }, [
          SPAN({ className: style.title }, ['PAGE:']),
          UL({ className: style.ul }, pages),
        ]),
      ])
    );
  }
}

export default Navigation;
