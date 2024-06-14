"use strict";

const trainingInformation = [

    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8,
        "imgSrc": "./img/id1.jpg"
    },
    {
        "id": 2,
        "name": "Бокс",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5,
        "imgSrc": "./img/id2.jpg"
    },
    {
        "id": 3,
        "name": "Теннис",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15,
        "imgSrc": "./img/id3.jpg"
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10,
        "imgSrc": "./img/id4.jpg"
    },
    {
        "id": 5,
        "name": "Борьба",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6,
        "imgSrc": "./img/id5.jpg"
    }
]

const localStorageKey = "signUpTraining";
const section = document.querySelector('.section');

trainingInformation.forEach((element) => {
    let disabledCancelRecording = "disabled";
    let disabledSignUp = "";
    const array = JSON.parse(localStorage.getItem(localStorageKey));
    if (array != null) {
        array.forEach((elem) => {
            if (elem.id === element.id) {
                element.currentParticipants += 1;
                disabledCancelRecording = "";
                disabledSignUp = "disabled";
            }
        });
    };

    section.insertAdjacentHTML("afterbegin",
        itemRecords(element, disabledSignUp, disabledCancelRecording));
    // console.log(element.currentParticipants);
    // return element.currentParticipants;
});

function itemRecords(item, signUp, cancelRecording) {
    return `
      <div class="col">
        <div class="card h-100">
          <img src="${item.imgSrc}" class="card-img-top" alt="...">
          <div class="card-body itemTraining">
            <h3 class="card-title">Занятие: ${item.name}</h3>
            <p class="card-text">Время проведения: ${item.time}</p>
            <p class="maxParticipants card-text">Максимальное количество мест:<span class="maxNumberCurrentParticipants"> ${item.maxParticipants}</span></p>
            <p class="currentParticipants card-text">Текущее количество участников: <span class="numberCurrentParticipants">${item.currentParticipants}</span></p>
            <button ${signUp} onClick="signUp(this, ${item.id})" class="btn btn-primary sign-up-button">Записаться</button>
            <button ${cancelRecording} onClick="cancelRecording(this, ${item.id})" class="btn btn-primary cancel-recording-button">Отменить запись</button>
          </div>
        </div>
      </div>
   `;
}

/* Функция записи при нажатии на кнопку "Записаться"*/
function signUp(item, id) {
    const numberCurrentParticipants = item.parentElement.getElementsByClassName("numberCurrentParticipants");
    const maxNumberCurrentParticipants = item.parentElement.getElementsByClassName("maxNumberCurrentParticipants");
    const cancelRecordingButton = item.parentElement.getElementsByClassName("cancel-recording-button");

    numberCurrentParticipants.item(0).textContent = Number(numberCurrentParticipants.item(0).textContent) + 1;

    cancelRecordingButton.item(0).disabled = false;
    if (Number(maxNumberCurrentParticipants.item(0).textContent) <= numberCurrentParticipants.item(0).textContent) { item.disabled = true; }
    saveLocalStorage(id);
}

/* Функция отмены записи при нажатии на кнопку "Отменить запись"*/
function cancelRecording(item, id) {
    const numberCurrentParticipants = item.parentElement.getElementsByClassName("numberCurrentParticipants");
    const signUpButton = item.parentElement.getElementsByClassName("sign-up-button");

    numberCurrentParticipants.item(0).textContent = Number(numberCurrentParticipants.item(0).textContent) - 1;

    signUpButton.item(0).disabled = false;
    if (Number(numberCurrentParticipants.item(0).textContent) <= 0) { item.disabled = true; }

    removeLocalStorage(item, id);
}

/* Функция записи в localStorage */
function saveLocalStorage(id) {
    let record = localStorage.getItem(localStorageKey);
    if (record === null) {
        record = JSON.stringify([{ id: id }]);
    } else {
        const arr = JSON.parse(record);
        arr.push({ id: id });
        record = JSON.stringify(arr);
    }
    localStorage.setItem(localStorageKey, record);
}

/* Функция удаления из localStorage */
function removeLocalStorage(item, id) {
    let arr;
    let record = localStorage.getItem(localStorageKey);
    if (record !== null) {
        arr = JSON.parse(record);
        const index = arr.indexOf(arr.find(it => it.id === id));
        arr.splice(index, 1);
        record = JSON.stringify(arr);
    }
    if (arr.length !== 0) {
        localStorage.setItem(localStorageKey, record);

    } else {
        localStorage.removeItem(localStorageKey);
        item.disabled = true;
    }
}