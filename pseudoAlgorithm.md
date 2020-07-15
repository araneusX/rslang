<strong>Идея интервального повторения в следующем:</strong>
Первый раз вы должны повторить это слово где-нибудь через пару минут, потом — через час, далее — на следующий день, затем — через 2 дня, 5 дней, 10 дней, 3 недели, 6 недель, 3 месяца, 6 месяцев и т.д.
<pre>
const koefficients = [KOEFF_DIFF = 1, KOEFF_OK = 1.2, KOEFF_EASY = 1.5];
const difficulty = 'какое-то число'; // easy - 0, ok - 1, difficult - 2
const countOfRepeat = 'какое-то число';
const persentOfRightAnswers = 'какое-то число';
//difficulty, countOfRepeat, persentOfRightAnswers получаются из статистики по слову
let nextShowTime = 0; // 0 - этa же тренировка, 1 - следующая, 2 - через день и тд
switch (difficulty) {
    case 0:
        if(counOfRepeat === 1) nextShowTime = 1;
        else nextShowTime = Math.round(countOfRepeat * KOEFF_EASY + persentOfRightAnswers)
        break;
    case 1:
         if(counOfRepeat === 1) nextShowTime = 1;
        else nextShowTime = Math.round(countOfRepeat * KOEFF_OK + persentOfRightAnswers)
        break;
    case 2:
        if(counOfRepeat === 1) nextShowTime = 0;
        else nextShowTime = Math.round((countOfRepeat/2) * KOEFF_DIFF + persentOfRightAnswers) // KOEFF_DIFF можно и не писать
        break;
}

//было бы здорово в том месте, где будут хранится слова юзера, в объект добавить поле о времени следующего слова.
//По этим значениям выбирать слова. Те что имеют наименьшее число nextShowTime включаются в список для тренировки.
//Можно было бы с наступлением нового дня все эти значения уменьшать на 1, но возможно это усложнение всего.
</pre>
