'use strict'

import {numbers} from "../index.js";

export const addAtrNum = () => {
    numbers.forEach((num) => {
        let coords = num.split(',');
        let td = document.querySelectorAll(`[data-td="${+coords[0]},${+coords[1]}"]`)[0];
        let dataNum = +td.getAttribute('data-num');
        if (!dataNum) dataNum = 0;
        td.setAttribute('data-num', `${dataNum + 1}`);
    })
}