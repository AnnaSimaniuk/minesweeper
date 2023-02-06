'use strict'

// Функція виграшу в грі
import {changeGameOver, message} from "../index.js";

export const victory = () => {
    const tdArr = Array.from(document.getElementsByTagName('td'));
    let win = true;
    tdArr.forEach(td => {
        if (!td.classList.contains('td_check') && !td.classList.contains('mina')) {
            win = false;
        }
    });
    if (win) {
        message.textContent = 'YOU WIN';
        tdArr.forEach(td => td.style.cursor = 'default');
        changeGameOver();
    }
}