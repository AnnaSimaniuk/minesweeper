'use strict'

import {minas, numbers, size} from "../index.js";

export const addCoords = () => {
    let x = 0;
    let y = 0;
    const tdArr = Array.from(document.getElementsByTagName('td'));
    tdArr.forEach((td) => {
        td.setAttribute('data-td', `${x},${y}`);

// Формування масиву мін і цифр, які навколо бомб
        if (td.classList.contains('mina')) {
            minas.push(`${x},${y}`);

            if (x > 0) numbers.push(`${x - 1},${y}`);
            if (x < size - 1) numbers.push(`${x + 1},${y}`);
            if (y > 0) numbers.push(`${x},${y - 1}`);
            if (y < size - 1) numbers.push(`${x},${y + 1}`);

            if (x > 0 && y > 0) numbers.push(`${x - 1},${y - 1}`);
            if (x < size - 1 && y < size - 1) numbers.push(`${x + 1},${y + 1}`);

            if (y > 0 && x < size - 1) numbers.push(`${x + 1},${y - 1}`);
            if (x > 0 && y < size - 1) numbers.push(`${x - 1},${y + 1}`);
        }

        x++;
        if (x >= size) {
            x = 0;
            y++;
        }
    })
}