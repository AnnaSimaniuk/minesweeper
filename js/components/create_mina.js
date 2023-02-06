'use strict'

export function createMina(size) {
    const tdArr = Array.from(document.getElementsByTagName('td'));
    const countMina = document.querySelector('.count-mina');

    let mina;

    const allCells = size * size;
    for (let i = 0; i < Math.floor(allCells / 6); i++) {
        mina = Math.floor(Math.random() * allCells);
        if (tdArr[mina].classList.contains('mina')) {
            mina = Math.floor(Math.random() * allCells);
            tdArr[mina].classList.add('mina');
        } else {
            tdArr[mina].classList.add('mina');
        }
    }

    // рахуємо кількість мін
    let minaArr = 0;
    tdArr.forEach(td => {
        if (td.classList.contains('mina')) {
            minaArr += 1;
        }
    })

    // Вносим дані в поле
    countMina.textContent = `${minaArr}`;
}