'use strict'

// Функція програшу в грі
import {changeGameOver, gameOver, message, minas} from "../index.js";

export function endGame (td) {
    const tdArr = Array.from(document.getElementsByTagName('td'));
    changeGameOver();
    message.textContent = 'GAME OVER!';
    let coordinate = td.getAttribute('data-td');
    tdArr.forEach(td => {
        if (minas.includes(coordinate)) {
            td.classList.remove('flag');
            td.classList.add('td_check');
            td.style.cursor = 'default';
        }
        if (td.classList.contains('mina')) {
            td.style.backgroundImage = 'url("img/mina.png")';
            td.style.cursor = 'default';
        }
    })
}

