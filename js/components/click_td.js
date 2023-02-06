'use strict'

// Функція кліку (перевіряє чи є міна, якщо так, кінець гри, якщо ні перевіряє чи має комірка атрибут цифри, якщо так
// відкриває клітинку та встановлює туди цифру з атрибута цифр, якщо ні запускаємо функцію відкриття сусідніх комірок)

import {gameOver, minas} from "../index.js";
import {endGame} from "./end_game.js";
import {victory} from "./win_game.js";


export function clickTd(td) {
    let numberColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];
    if (gameOver) return;
    if (td.classList.contains('td_check') || td.classList.contains('flag')) return;
    let coordinate = td.getAttribute('data-td');
    let num = td.getAttribute('data-num');
    if (minas.includes(coordinate)) {
        endGame(td)
    } else {
        if (num != null) {
            td.classList.add('td_check');
            td.textContent = num;
            td.style.color = numberColors[num - 1];
            victory();
            return;
        } else {
            checkTd(td, coordinate);
        }
    }
    td.classList.add('td_check');
}

// Функція, яка дозволить відкрити сусідні комірки, якщо вони пусті, до номерів.
export function checkTd(td, coordinate) {
    const tdArr = Array.from(document.getElementsByTagName('td'));
    const tdSize = Math.sqrt(tdArr.length);
    let coords = coordinate.split(',');
    let x = +coords[0];
    let y = +coords[1];

    const dblClickEndGame = target => {
        if (target.classList.contains('mina') && !target.classList.contains('flag')) {
            endGame(td)
        }
    }

    setTimeout(() => {
        if (x > 0) {
            let targetW = document.querySelector(`[data-td="${x - 1},${y}"`);
            clickTd(targetW, `${x - 1},${y}`);
            dblClickEndGame(targetW);
        }
        if (x < tdSize - 1) {
            let targetE = document.querySelector(`[data-td="${x + 1},${y}"`);
            clickTd(targetE, `${x + 1},${y}`);
            dblClickEndGame(targetE);
        }
        if (y > 0) {
            let targetN = document.querySelector(`[data-td="${x},${y - 1}"]`);
            clickTd(targetN, `${x},${y - 1}`);
            dblClickEndGame(targetN);
        }
        if (y < tdSize - 1) {
            let targetS = document.querySelector(`[data-td="${x},${y + 1}"]`);
            clickTd(targetS, `${x},${y + 1}`);
            dblClickEndGame(targetS);
        }
        if (x > 0 && y > 0) {
            let targetNW = document.querySelector(`[data-td="${x - 1},${y - 1}"`);
            clickTd(targetNW, `${x - 1},${y - 1}`);
            dblClickEndGame(targetNW);
        }
        if (x < tdSize - 1 && y < tdSize - 1) {
            let targetSE = document.querySelector(`[data-td="${x + 1},${y + 1}"`);
            clickTd(targetSE, `${x + 1},${y + 1}`);
            dblClickEndGame(targetSE);
        }
        if (y > 0 && x < tdSize - 1) {
            let targetNE = document.querySelector(`[data-td="${x + 1},${y - 1}"]`);
            clickTd(targetNE, `${x + 1},${y - 1}`);
            dblClickEndGame(targetNE);
        }
        if (x > 0 && y < tdSize - 1) {
            let targetSW = document.querySelector(`[data-td="${x - 1},${y + 1}"`);
            clickTd(targetSW, `${x - 1},${y + 1}`);
            dblClickEndGame(targetSW);
        }
    }, 10);
}