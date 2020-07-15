import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import headerStyle from '../../commonComponents/header/header.module.scss';
import style from './promo.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Promo:React.FC = () => {
  const [pageDescription, setPageDescription] = useState('');

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    className: style.sliderClass,
    focusOnSelect: false,
    arrows: false,
    autoHeight: true
  };

  const array: string[] = [];
  for (let i = 0; i < 15; i += 1) {
    array.push(`/images/screenshots/${i + 1}screen.png`);
  }

  return (
    <>
      <div className={style.promoHeader}>
        <div className={headerStyle['header-logo']}>
          <div className={headerStyle['logo-rslang']} />
          <span className={headerStyle.rs}>RS</span>
          <span className={headerStyle.lang}>Lang</span>
        </div>
        <Link to="/authorization" className={style.logIn}>
          Авторизоваться
        </Link>
      </div>

      <div className={style.bgContainer}>
        <div className={style.screen} />
        <div className={style.contentWrapper}>
          <div className={style.commonBlock}>
            <div className={style.startText}>
              <h2>Что такое RSlang?</h2>
              <p>
                Приложение
                {' '}
                <strong>RSlang</strong>
                {' '}
                - отличный способ весело и качественно изучить более 3 тысяч английских слов
                и их употребление в речи!
                <br />
                Изучать английский язык будет интересно как взрослым, так и детям, а приятный дизайн и настраиваемый геймплей с кучей игр не дадут вам заскучать!
              </p>
            </div>

            <div className={style.mainPromoInfo}>
              <iframe
                className={style.videoWrapper}
                src="https://www.youtube.com/embed/y2vPiGMlQl0"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
          <div className={style.largeText}>
            <h3>RSlang имеет ряд особенностей, делающих его уникальным!</h3>
            <ul>
              <li>
                <strong>Методика интервального повторения</strong>
                {' '}
                - это ключевой элемент приложения, определяющий насколько эффективно вы изучите слова
              </li>
              <li>
                <strong>Большое количество настроек</strong>
                {' '}
                - благодаря которым вы можете изменять внешний вид и некоторые детали работы приложения в соответствии с собственными предпочтениями
              </li>
              <li>
                <strong>Статистика</strong>
                {' '}
                - вы можете наблюдать статистику изучения слов, как краткосрочную – по результатам каждой тренировки, так и долгосрочную – за весь период обучения.
              </li>
              <li>
                <strong>Большое колличество игр</strong>
                {' '}
                - кроме стандартного обучения, можно играть в 6 мини-игр. Это поможет развивать твой английский со всех сторон!
              </li>
            </ul>
          </div>
          <div className={style.commonBlock}>
            <Slider {...settings}>
              {array.map((item, index) => <div key={`screen${index + 1}`}><img src={item} /></div>)}
            </Slider>
            <div className={style.more}>
              <h3>Подробнее о страницах</h3>
              <ul>
                <li title="Узнать больше" onClick={() => setPageDescription('authorization')}>Cтраница авторизации</li>
                <li title="Узнать больше" onClick={() => setPageDescription('main')}>Cтраница обучения</li>
                <li title="Узнать больше" onClick={() => setPageDescription('statistics')}>Cтраница статистики</li>
                <li title="Узнать больше" onClick={() => setPageDescription('vocambilary')}>Страница словаря</li>
                <li title="Узнать больше" onClick={() => setPageDescription('mini-games')}>Cтраница мини-игр</li>
                <li title="Узнать больше" onClick={() => setPageDescription('settings')}>Cтраница настроек</li>
                <li title="Узнать больше" onClick={() => setPageDescription('about-team')}>Cтраница о команде</li>
              </ul>
            </div>
          </div>
          {pageDescription === 'authorization'
        && (
        <div className={style.commonBlock}>
          <div className={style.aboutContainer}>
            <h3>Страница авторизации</h3>
            <p>
              {' '}
              Попадая в приложение тебе необходимо зарегистрироваться или зайти в учетную запись под существующими данными.
              Регистрируясь, помни, что твой email должен быть настоящим, а пароль должен содержать не менее 8 символов, как
              минимум одну прописную букву, одну заглавную букву, одну цифру и один спецсимвол из
              <i>{'+-_&@$!%*?#.,;:[]{}'}</i>
              .
            </p>
          </div>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/1screen.png" />
          </div>
        </div>
        )}
          {pageDescription === 'main'
        && (
        <div className={style.commonBlock} id="lol">
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/3screen.png" />
          </div>
          <div className={style.aboutContainer}>
            <h3>Страница обучения</h3>
            <p>
              {' '}
              На странице обучения вы можете тренировать свой английский вводя нужные слова слова в зависимости от подсказок
              регулируемых настройками, при ответе,  вы можете послушать произношение употребления этого слова. При верном ответе
              или по кнопке показать ответ  методика интервального повторения дает следующую карточку в зависимости от того, насколько успешно вы отвечали!
            </p>
          </div>
        </div>
        )}

          {pageDescription === 'statistics'
        && (
        <div className={style.commonBlock} id="lol">
          <div className={style.aboutContainer}>
            <h3>Страница статистики</h3>
            <p>
              {' '}
              На странице статистики есть 3 режима: статистика за сегодня, изученные слова, ежедневные достижения. Вы можете отследить свой прогресс как
              вам угодно, от количества просмотренных карточек, до графиков с прогрессом изучения по каждому дню!
            </p>
          </div>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/13screen.png" />
          </div>
        </div>
        )}

          {pageDescription === 'vocambilary'
        && (
        <div className={style.commonBlock}>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/15screen.png" />
          </div>
          <div className={style.aboutContainer}>
            <h3>Страница словаря</h3>
            <p>
              {' '}
              На странице словарь, можно посмотреть слова собранные по 3 разделам: все изучаемые слова, сложные слова, удаленные слова.
              Вы можете собирать ваш словарь, как душе угодно и с помощью него погружаться в слова,
              которые вызвали трудности при тренировке!
            </p>
          </div>
        </div>
        )}

          {pageDescription === 'mini-games'
        && (
        <div className={style.commonBlock}>
          <div className={style.aboutContainer}>
            <h3>Страница мини-игр</h3>
            <ul>
              <li title="Узнать больше" onClick={() => setPageDescription('puzzle')}>Пазл</li>
              <li title="Узнать больше" onClick={() => setPageDescription('speakIt')}>Speak It</li>
              <li title="Узнать больше" onClick={() => setPageDescription('savannah')}>Саванна</li>
              <li title="Узнать больше" onClick={() => setPageDescription('challenge')}>Аудиовызов</li>
              <li title="Узнать больше" onClick={() => setPageDescription('sprint')}>Спринт</li>
              <li title="Узнать больше" onClick={() => setPageDescription('associations')}>Ассоициации</li>
            </ul>
          </div>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/4screen.png" />
          </div>
        </div>
        )}
          {pageDescription === 'puzzle'
        && (
        <div className={style.commonBlock}>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/9screen.png" />
          </div>
          <div className={style.aboutContainer}>
            <h3>English Puzzle</h3>
            <p>
              {' '}
              English-puzzle - мини-игра, цель которой собрать картину , выбирая подсказки, собирая при этом
              предложения из размещенных в случайном порядке английских слов.
              Предложения выводятся на страницу группами по 10 штук. Возле каждого предложения
              отображается ячейки для вставки слов и вперемешку слова, из которого состоит предложение.
              При клике по слову или его перетаскивании, слово перемещается в ячейку предложения
            </p>
          </div>
        </div>
        )}
          {pageDescription === 'speakIt'
        && (
        <div className={style.commonBlock}>
          <div className={style.aboutContainer}>
            <h3>Speak It</h3>
            <p>
              {' '}
              SpeakIt - мини-игра, при помощи которой можно прослушать произношение английских слов и
              использовать технологию распознавания речи для проверки правильности произношения.
              Cлова выводятся на страницу группами по 10 слов. Возле каждого слова отображается транскрипция и иконка аудио.
              При клике по слову звучит его произношение, выводятся соответствующие данному слову картинка и перевод
              У вас есть возможность включить (и отключить) распознавание речи.
            </p>
          </div>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/10screen.png" />
          </div>
        </div>
        )}
          {pageDescription === 'savannah'
        && (
        <div className={style.commonBlock}>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/6screen.png" />
          </div>
          <div className={style.aboutContainer}>
            <h3>Savannah</h3>
            <p>
              {' '}
              Savannah - мини-игра, где на экран выводиться слова на английском языке. Нужно выбрать перевод слова из
              четырех предложенных вариантов ответа пока слово не слово не достигло пунктирной линнии, так вы наберете больше баллов. Слова можно угадывать выбирая их как кликами мышкой. Переводы слов,
              из которых выбирается нужный, относятся к одной части речи и имеют схожее написание.
            </p>
          </div>
        </div>
        )}
          {pageDescription === 'challenge'
        && (
        <div className={style.commonBlock}>
          <div className={style.aboutContainer}>
            <h3>Аудиовызов</h3>
            <p>
              {' '}
              Аудиовызов - мини-игра, где звучит произношение слова на английском языке, нужно выбрать перевод
              слова из пяти предложенных вариантов ответа. Слова можно угадывать выбирая их как кликами мышкой, так
              и нажатием кнопок клавиатуры, переход к следующему вопросу происходит при клике по стрелке.
              Переводы слов, из которых выбирается нужный, относятся к одной части речи и имеют схожее написание.
            </p>
          </div>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/8screen.png" />
          </div>
        </div>
        )}
          {pageDescription === 'sprint'
        && (
        <div className={style.commonBlock}>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/7screen.png" />
          </div>
          <div className={style.aboutContainer}>
            <h3>Sprint</h3>
            <p>
              {' '}
              Sprint - мини-игра, где вы видите слово на английском языке и перевод слова, нужно указать принадлежит ли
              данный перевод этому слову. Продолжительность раунда 1 минута, в начале игры за каждое угаданное слово
              начисляется 10 баллов, каждые четыре правильных ответа подряд увеличивают количество баллов за каждое
              угаданное слово вдвое, при ошибке за угаданное слово снова начисляется только 10 баллов.
              Слова можно угадывать выбирая их как кликами мышкой, так и нажатием стрелок на клавиатуре
            </p>
          </div>
        </div>
        )}
          {pageDescription === 'associations'
        && (
        <div className={style.commonBlock}>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/5screen.png" />
          </div>
          <div className={style.aboutContainer}>
            <h3>Ассооциации</h3>
            <p>
              {' '}
              Ассоциации - русская народная игра, где вы видите 10 слов и 10 картинок с описанием к ним.
              Ваша цель - соединить все картинки со своими словами. Вы можете выбирать какие слова будете играть,
              выбирая из уже изученных и всеми доступными.
            </p>
          </div>
        </div>
        )}

          {pageDescription === 'settings'
        && (
        <div className={style.commonBlock}>
          <div className={style.aboutContainer}>
            <h3>Страница настроек</h3>
            <p>
              {' '}
              Здесь вы можете манипулировать ходом основной и мини-игр, как вам вздумается. Можете добавлять
              и убирать кнопки управления, можете добавлять подсказки, выбирать уровень сложности, колличество
              карточек в день. Кастомизируйте приложение под себя!
            </p>
          </div>
          <div className={style.screenShotContainer}>
            <img src="/images/screenshots/11screen.png" />
          </div>
        </div>
        )}

          {pageDescription === 'about-team'
          && (
          <div className={style.commonBlock}>
            <div className={style.screenShotContainer}>
              <img src="/images/screenshots/5screen.png" />
            </div>
            <div className={style.aboutContainer}>
              <h3>О команде</h3>
              <p>
                Здесь вы можете посмотреть, кто создавал приложение RSlang,
                и почитать интересную информацию об этих людях. Можно увидеть кто чем занимался,
                какой вклад в разработку RSlang внес.
              </p>
            </div>
          </div>
          )}

          <div className={style.promoFooter}>
            <h3>Уже не терпиться начать? Скорее авторизуйтесь!</h3>
            <Link to="/authorization" className={style.logIn}>
              Авторизоваться
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Promo;
