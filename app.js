const API = "http://localhost:8000/test";

//? это основной контейнер
const ContainerContent = document.querySelector(".container__content");

//? это парамерты вывода истории активностей
const viewDaily = document.querySelector(".view-selector__item--change1");
const viewWeekly = document.querySelector(".view-selector__item--change2");
const viewMonthly = document.querySelector(".view-selector__item--change3");

//? контейнер карточек
const itemList = document.querySelector(".item__list");

//? событие на кнопке неледя
viewWeekly.addEventListener("click", () => {
  viewDaily.classList.remove("view-selector__item--active");
  viewMonthly.classList.remove("view-selector__item--active");
  viewWeekly.classList.add("view-selector__item--active");
  getData();
});

//? сюда сохраняю весь массив с данными сервера
let dataBase = null;

//? в параметрах адрес по дефолту эта функция отрабатывает при загрузке сохраняет данные в переменную и потом мы просто итерируемся по массиву с данными и динамически подставляем значения
async function getData() {
  const response = await fetch(API);
  dataBase = await response.json();
  itemList.innerHTML = "";
  dataBase.map(item => {
    let box = document.createElement("div");
    box.classList.add("container__item");
    let tlc = item.title;
    let tlc2 = tlc.toLowerCase().replace(/ /g, "-");
    box.classList.add(`container__item--${tlc2}`);
    itemList.append(box);
    box.innerHTML += `<div class="tracking-card">
    <div class="tracking-card__header">
      <h4 class="tracking-card__title">${item.title}</h4>
      <img
        class="tracking-card__menu"
        src="images/icon-ellipsis.svg"
        alt="menu"
      />
    </div>
    <div class="tracking-card__body">
      <div class="tracking-card__time">
      ${item.timeframes.weekly.current}hrs
      </div>
      <div class="tracking-card__prev-period">
      Previous - ${item.timeframes.weekly.previous}hrs
      </div>
    </div>
  </div>`;
  });
}
getData();

viewDaily.addEventListener("click", () => {
  viewWeekly.classList.remove("view-selector__item--active");
  viewMonthly.classList.remove("view-selector__item--active");
  viewDaily.classList.add("view-selector__item--active");
  itemList.innerHTML = "";
  dataBase.map(item => {
    let box = document.createElement("div");
    box.classList.add("container__item");
    let tlc = item.title;
    let tlc2 = tlc.toLowerCase().replace(/ /g, "-");
    box.classList.add(`container__item--${tlc2}`);
    itemList.append(box);
    box.innerHTML += `<div class="tracking-card">
    <div class="tracking-card__header">
      <h4 class="tracking-card__title">${item.title}</h4>
      <img
        class="tracking-card__menu"
        src="images/icon-ellipsis.svg"
        alt="menu"
      />
    </div>
    <div class="tracking-card__body">
      <div class="tracking-card__time">
      ${item.timeframes.daily.current}hrs
      </div>
      <div class="tracking-card__prev-period">
      Previous - ${item.timeframes.daily.previous}hrs
      </div>
    </div>
  </div>`;
  });
});

viewMonthly.addEventListener("click", () => {
  viewDaily.classList.remove("view-selector__item--active");
  viewWeekly.classList.remove("view-selector__item--active");
  viewMonthly.classList.add("view-selector__item--active");
  itemList.innerHTML = "";
  dataBase.map(item => {
    let box = document.createElement("div");
    box.classList.add("container__item");
    let tlc = item.title;
    let tlc2 = tlc.toLowerCase().replace(/ /g, "-");
    box.classList.add(`container__item--${tlc2}`);
    itemList.append(box);
    box.innerHTML += `<div class="tracking-card">
    <div class="tracking-card__header">
      <h4 class="tracking-card__title">${item.title}</h4>
      <img
        class="tracking-card__menu"
        src="images/icon-ellipsis.svg"
        alt="menu"
      />
    </div>
    <div class="tracking-card__body">
      <div class="tracking-card__time">
      ${item.timeframes.monthly.current}hrs
      </div>
      <div class="tracking-card__prev-period">
      Previous - ${item.timeframes.monthly.previous}hrs
      </div>
    </div>
  </div>`;
  });
});
