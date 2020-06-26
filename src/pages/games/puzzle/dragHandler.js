const drag = {};
document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('assembled-word-game-puzzle')) {
    drag.element = e.target;
    drag.parent = drag.element.parentNode;
    drag.bound = drag.element.getBoundingClientRect();
    drag.xPosition = e.clientX - drag.bound.x;
    drag.yPosition = e.clientY - drag.bound.y;
    drag.x = e.clientX;
    drag.y = e.clientY;
    drag.element.style.left = `${e.clientX - drag.xPosition}px`;
    drag.element.style.top = `${e.clientY - drag.yPosition}px`;
    e.target.classList.remove('absolute');
    e.target.classList.add('fixed', 'grabbing');
  }
});

document.addEventListener('mousemove', (e) => {
  if (drag.element) {
    if (e.target.parentNode.classList.contains('word-game-puzzle')) {
      document.querySelector('.game-round-words').append(drag.element);
    }
    drag.element.style.left = `${e.clientX - drag.xPosition}px`;
    drag.element.style.top = `${e.clientY - drag.yPosition}px`;
    drag.element.classList.add('event-none');
  }
});

document.addEventListener('mouseup', (e) => {
  if (drag.element) {
    const isDrop = e.target.classList.contains('word-game-puzzle');
    const isKeyDrag = e.target.getAttribute('data-key-sentence');
    const isKeyDrop = drag.element.getAttribute('data-key-sentence');
    const roundElements = drag.element.parentNode.classList.contains('game-round-words');

    const isDropPuzzle = e.target.classList.contains('assembled-word-game-puzzle');
    if (isDropPuzzle) {
      e.target.parentNode.append(drag.element);
      drag.parent.append(e.target);
    }

    if (drag.x === e.clientX && drag.y === e.clientY) {
      if (roundElements) {
        const empty = [...document.querySelector('.opacity-full').children].find((word) => !word.children.length);
        empty.append(drag.element);
        drag.element.classList.add('absolute');
      } else {
        document.querySelector('.game-round-words').append(drag.element);
      }
    }
    if ((isKeyDrag === isKeyDrop) && isDrop && !e.target.children.length) {
      e.target.append(drag.element);
    }

    drag.element.classList.remove('fixed', 'grabbing', 'event-none');
    drag.element.style.left = '0px';
    drag.element.style.top = '0px';
    drag.element = undefined;
    [...document.querySelector('.game-round-words').children].forEach((el) => {
      el.classList.remove('absolute');
    });

    let countFillRound = 0;
    const currentSentence = document.querySelector('.opacity-full');
    [...currentSentence.children].forEach((el) => {
      if (el.children.length) {
        countFillRound += 1;
        el.children[0].classList.add('absolute');
        el.children[0].style.left = '0px';
        el.children[0].style.top = '0px';
      }
    });
    if (countFillRound === currentSentence.children.length) {
      currentSentence.classList.remove('opacity-full');
      currentSentence.classList.add('event-none-opacity-full');
      document.querySelector('.dont-know-botton').classList.add('hidden');
      document.querySelector('.check-botton').classList.remove('hidden');
    }
  }
});
