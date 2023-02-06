'use strict'

import {createTable} from "./components/create_table.js";
import {createMina} from "./components/create_mina.js";
import {addCoords} from "./components/add_coord.js";
import {addAtrNum} from "./components/add_atr_num.js";
import {flag} from "./components/add_flag.js";
import {clickTd} from "./components/click_td.js";
import {dblclickTd} from "./components/dblclick_td.js";

export const countFlag = document.querySelector('.count-flag');
countFlag.textContent = '0';

export let gameOver = false;
export const changeGameOver = () => gameOver = true;

const inputSize = document.querySelector('.input-size');
const btnSize = document.querySelector('.btn-size');
export const message = document.querySelector('.message');
const newGame = document.querySelector('.btn-new-game');

export let numbers = [];
export let minas = [];
export let size = 8;

// Створення гри
function createGame() {

//створення таблиці
    createTable(size);

// накладання мін
    createMina(size);

//Накладання координат в кожну комірку
    const tdArr = Array.from(document.getElementsByTagName('td'));
    addCoords();

// Встановлення атрибуту коміркам, які мають в собі цифри. Підрахунок цифр.
    addAtrNum();

    // Відкидання з мін атрибуту номера
    tdArr.forEach((td) => {
        if (td.classList.contains('mina')) {
            td.removeAttribute('data-num')
        }
    })

    // Функції клавіш
    tdArr.forEach(td => {

        // встановлення прапорців
        td.addEventListener('contextmenu', e => {
            e.preventDefault();
            flag(td);
        })

        // відкриття клітинок
        td.addEventListener('click', () => {
            newGame.style.display = 'block';
            clickTd(td);
        })

        // подвійний клік
        td.addEventListener('dblclick', () => {
            dblclickTd(td);
        })
    })
}


createGame();

// Функція стирання даних
function restart() {
    const tdArr = Array.from(document.getElementsByTagName('td'));
    const trArr = Array.from(document.getElementsByTagName('tr'));
    gameOver = false;
    minas = [];
    numbers = [];
    trArr.forEach(tr => {
        tr.remove()
    })
    tdArr.forEach(td => {
        td.remove()
    })
    message.textContent = '';
    countFlag.textContent = '0';
    newGame.style.display = 'none';
}

// Початок нової гри
newGame.addEventListener('click', e => {
    e.preventDefault();
    restart()
    createGame();
})


//Побудова нової таблиці по розмірах, які вказав користувач
btnSize.addEventListener('click', () => {
    size = +inputSize.value;
    const error = document.querySelector('.error');
    if (+inputSize.value < 3) {
        error.style.display = 'inline-block';
    } else {
        error.style.display = 'none';
        restart();
        createGame();
    }
})


