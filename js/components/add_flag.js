'use strict'

// Функція встановлення прапорців
import {countFlag, gameOver} from "../index.js";

export function flag(td) {
    const tdArr = Array.from(document.getElementsByTagName('td'));
    if (gameOver) return;
    if (!td.classList.contains('td_check')) {
        td.classList.toggle('flag')
        let flagArr = 0;
        tdArr.forEach(td => {
            if (td.classList.contains('flag')) {
                flagArr += 1;
            }
        })
        // Вносим дані в поле
        countFlag.textContent = `${flagArr}`;
    }
}
