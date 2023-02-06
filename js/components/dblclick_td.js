'use strict'

// Функція подвійного кліку на клітинку з цифрою - якщо навколо неї встановлено таку ж кількість прапорців,
// що зазначено на цифрі цієї комірки, відкриваються всі сусідні комірки

import {gameOver} from "../index.js";
import {checkTd} from "./click_td.js";

export function dblclickTd(td) {
    const tdArr = Array.from(document.getElementsByTagName('td'));
    const tdSize = Math.sqrt(tdArr.length);
    let num = +td.getAttribute('data-num')
    if (gameOver) return;
    if (td.hasAttribute('data-num')) {
        let coordinate = td.getAttribute('data-td');
        let coords = coordinate.split(',');
        let x = +coords[0];
        let y = +coords[1];
        let countFlag = 0;
        if (x > 0) {
            let targetW = document.querySelectorAll(`[data-td="${x - 1},${y}"`)[0];
            if (targetW.classList.contains('flag')) {
                countFlag += 1;
            }
        }
        if (x < tdSize - 1) {
            let targetE = document.querySelectorAll(`[data-td="${x + 1},${y}"`)[0];
            if (targetE.classList.contains('flag')) {
                countFlag += 1;
            }
        }
        if (y > 0) {
            let targetN = document.querySelectorAll(`[data-td="${x},${y - 1}"]`)[0];
            if (targetN.classList.contains('flag')) {
                countFlag += 1;
            }
        }
        if (y < tdSize - 1) {
            let targetS = document.querySelectorAll(`[data-td="${x},${y + 1}"]`)[0];
            if (targetS.classList.contains('flag')) {
                countFlag += 1;
            }
        }
        if (x > 0 && y > 0) {
            let targetNW = document.querySelectorAll(`[data-td="${x - 1},${y - 1}"`)[0];
            if (targetNW.classList.contains('flag')) {
                countFlag += 1;
            }
        }
        if (x < tdSize - 1 && y < tdSize - 1) {
            let targetSE = document.querySelectorAll(`[data-td="${x + 1},${y + 1}"`)[0];
            if (targetSE.classList.contains('flag')) {
                countFlag += 1;
            }
        }
        if (y > 0 && x < tdSize - 1) {
            let targetNE = document.querySelectorAll(`[data-td="${x + 1},${y - 1}"]`)[0];
            if (targetNE.classList.contains('flag')) {
                countFlag += 1;
            }
        }
        if (x > 0 && y < tdSize - 1) {
            let targetSW = document.querySelectorAll(`[data-td="${x - 1},${y + 1}"`)[0];
            if (targetSW.classList.contains('flag')) {
                countFlag += 1;
            }
        }
        if (num === countFlag) {
            checkTd(td, coordinate)
        }
    }
}

