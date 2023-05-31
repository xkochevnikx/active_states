//! реализация на классах
const API = 'http://localhost:8000/test';

//todo - функция получения данных
async function getData() {
    const response = await fetch(API);
    const data = await response.json();
    return data;
}

//todo - class для отрисовки карточек, конструктор принимает данные по одной из активностей а их всего 6, контейнер, и вариант отображения.
class createCard {
    //todo - статический метод в котором лежит объект с ключами которые мне нужны для правильного грамматичского отображения текста в <div class="tracking-card__prev-period">
    static PERIODS = {
        daily: 'day',
        weekly: 'week',
        monthly: 'month',
    };
    constructor(data, container = '.item__list', view = 'weekly') {
        //todo - привязываем принимаемые данные к this создаваемого экземпляра
        this.data = data;
        this.container = document.querySelector(container);
        this.view = view;

        this._createMarkup();
    }

    _createMarkup() {
        //todo - достаём деструктуризацией из даты ключ title и объект timeframes
        const { title, timeframes } = this.data;
        //todo - для навешивания динамического класса и отображения индивидуального стиля карточки проводим махинации с title и помещаем текущий в переменную id
        const id = title.toLowerCase().replace(/ /g, '-');
        //todo - в timeframes в зависимости от переданного в конструктор view получаем один из трёх объектов и деструктурируем достаем текущее и предыдущее время
        const { current, previous } = timeframes[this.view];

        this.container.insertAdjacentHTML(
            'beforeend',
            `<div class="container__item container__item--${id}">
            <div class="tracking-card">
                <div class="tracking-card__header">
                  <h4 class="tracking-card__title">${title}</h4>
                  <img
                  class="tracking-card__menu"
                  src="images/icon-ellipsis.svg"
                  alt="menu"
                  />
                </div>
                <div class="tracking-card__body">
                  <div class="tracking-card__time">
                    ${current}hrs
                  </div>
                  <div class="tracking-card__prev-period">
                  Last ${createCard.PERIODS[this.view]} - ${previous}hrs
                  </div>
                </div>
            </div>
          </div>`
        );

        this.time = this.container.querySelector(
            `.container__item--${id}
            .tracking-card__time`
        );
        this.prev = this.container.querySelector(
            `.container__item--${id}
            .tracking-card__prev-period`
        );
    }

    changeView(view) {
        this.view = view.toLowerCase();
        const { current, previous } =
            this.data.timeframes[this.view.toLowerCase()];
        this.time.innerHTML = `${current}hrs`;
        this.prev.innerHTML = `${
            createCard.PERIODS[this.view]
        } - ${previous}hrs`;
    }
}

//todo - вешаем событие на завершение отрисовки дома, дергаем данные с сервера, и сохраняем в переменную 6 вызванныx эеземпляр класса с переданной в него карточкой
document.addEventListener('DOMContentLoaded', () => {
    getData().then((data) => {
        const activities = data.map((active) => new createCard(active));
        //todo - дальше после отрисовки получаем нодлист всех кнопок и идём по нему циклом вешая на каждую обработчик и функцию которая в себе при нажатии будет проходится на листу с кнопками и удалять у всех класс актив, после сразу вешать этот же класс на выбранную кнопку
        const selectors = document.querySelectorAll(
            '.view-selector__item--change'
        );
        selectors.forEach((selector) => {
            selector.addEventListener('click', () => {
                selectors.forEach((sel) =>
                    sel.classList.remove('view-selector__item--active')
                );
                selector.classList.add('view-selector__item--active');
                //todo - далее из выбранной кнопки мы берём текст в котором написан режим отображения убираем пробелы приводим к нижнему регистру
                const currentView = selector.innerText.trim().toLowerCase();
                //todo - после этого обращаемся к сохранённому массиву экземпляров классов и у каждого вызываем метод changeView и передаём в него текущее выбранное view(currentView)
                activities.forEach((active) => active.changeView(currentView));
            });
        });
    });
});

//! ниже реализация на функциях
// const API = 'http://localhost:8000/test';
// //? это парамерты вывода истории активностей, кнопки для переключения
// const viewDaily = document.querySelector('.view-selector__item--change1');
// const viewWeekly = document.querySelector('.view-selector__item--change2');
// const viewMonthly = document.querySelector('.view-selector__item--change3');
// //? контейнер карточек изначально пуст
// const itemList = document.querySelector('.item__list');
// //? сюда сохраняю весь массив с данными сервера
// let dataBase = null;
// //? событие на кнопке неледя, изменяем классы что бы подсветить выбранный режим и дергаем запрос данных
// viewWeekly.addEventListener('click', () => {
//     viewDaily.classList.remove('view-selector__item--active');
//     viewMonthly.classList.remove('view-selector__item--active');
//     viewWeekly.classList.add('view-selector__item--active');
//     getData();
// });
// //? в параметрах адрес по дефолту эта функция отрабатывает при загрузке сохраняет данные в переменную и потом мы просто итерируемся по массиву с данными и динамически подставляем значения.
// //todo -  что тут происходит) получаем данные, очищаем основной блок itemList в который будем отрисовывать, итерируемся по массиву, в массиве 6 карточек. на каждой итерации создаём див с классом container__item и добавляем еще один в зависимости от типа карточки потому что стили у всех разные, сохраняем title приводим его к нижнему регистру и регуляркой если есть пробел заменяем его на тире, затем из полученной строки динамически формируем дополнтельный класс и добавляем его. далее добавляем это блок в основной itemList и динамически наполняем его. Все классы уже лежат в css
// async function getData() {
//     const response = await fetch(API);
//     dataBase = await response.json();
//     itemList.innerHTML = '';
//     dataBase.map((item) => {
//         let box = document.createElement('div');
//         box.classList.add('container__item');
//         let tlc = item.title;
//         let tlc2 = tlc.toLowerCase().replace(/ /g, '-');
//         box.classList.add(`container__item--${tlc2}`);
//         itemList.append(box);
//         box.innerHTML += `<div class="tracking-card">
//     <div class="tracking-card__header">
//       <h4 class="tracking-card__title">${item.title}</h4>
//       <img
//         class="tracking-card__menu"
//         src="images/icon-ellipsis.svg"
//         alt="menu"
//       />
//     </div>
//     <div class="tracking-card__body">
//       <div class="tracking-card__time">
//       ${item.timeframes.weekly.current}hrs
//       </div>
//       <div class="tracking-card__prev-period">
//       Previous - ${item.timeframes.weekly.previous}hrs
//       </div>
//     </div>
//   </div>`;
//     });
// }
// getData();
// viewDaily.addEventListener('click', () => {
//     viewWeekly.classList.remove('view-selector__item--active');
//     viewMonthly.classList.remove('view-selector__item--active');
//     viewDaily.classList.add('view-selector__item--active');
//     itemList.innerHTML = '';
//     dataBase.map((item) => {
//         let box = document.createElement('div');
//         box.classList.add('container__item');
//         let tlc = item.title;
//         let tlc2 = tlc.toLowerCase().replace(/ /g, '-');
//         box.classList.add(`container__item--${tlc2}`);
//         itemList.append(box);
//         box.innerHTML += `<div class="tracking-card">
//     <div class="tracking-card__header">
//       <h4 class="tracking-card__title">${item.title}</h4>
//       <img
//         class="tracking-card__menu"
//         src="images/icon-ellipsis.svg"
//         alt="menu"
//       />
//     </div>
//     <div class="tracking-card__body">
//       <div class="tracking-card__time">
//       ${item.timeframes.daily.current}hrs
//       </div>
//       <div class="tracking-card__prev-period">
//       Previous - ${item.timeframes.daily.previous}hrs
//       </div>
//     </div>
//   </div>`;
//     });
// });
// viewMonthly.addEventListener('click', () => {
//     viewDaily.classList.remove('view-selector__item--active');
//     viewWeekly.classList.remove('view-selector__item--active');
//     viewMonthly.classList.add('view-selector__item--active');
//     itemList.innerHTML = '';
//     dataBase.map((item) => {
//         let box = document.createElement('div');
//         box.classList.add('container__item');
//         let tlc = item.title;
//         let tlc2 = tlc.toLowerCase().replace(/ /g, '-');
//         box.classList.add(`container__item--${tlc2}`);
//         itemList.append(box);
//         box.innerHTML += `<div class="tracking-card">
//     <div class="tracking-card__header">
//       <h4 class="tracking-card__title">${item.title}</h4>
//       <img
//         class="tracking-card__menu"
//         src="images/icon-ellipsis.svg"
//         alt="menu"
//       />
//     </div>
//     <div class="tracking-card__body">
//       <div class="tracking-card__time">
//       ${item.timeframes.monthly.current}hrs
//       </div>
//       <div class="tracking-card__prev-period">
//       Previous - ${item.timeframes.monthly.previous}hrs
//       </div>
//     </div>
//   </div>`;
//     });
// });
