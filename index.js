'use strict';

const table = document.querySelector('table');
const tbody = document.createElement('tbody')
table.append(tbody)

const countMina = document.querySelector('.count-mina');
const countFlag = document.querySelector('.count-flag');
countFlag.textContent = '0';

let gameOver = false;

const inputSize = document.querySelector('.input-size');
const btnSize = document.querySelector('.btn-size');
const message = document.querySelector('.message');
const newGame = document.querySelector('.btn-new-game');

let numbers = [];
let numberColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];
let minas = [];
let size = 8;

// Створення гри
function createGame() {
    let x = 0;
    let y = 0;

//створення таблиці
    function createTable(size) {
        for (let i = 0; i < size; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < size; j++) {
                const td = document.createElement('td');
                tr.append(td)
            }
            tbody.append(tr);
        }
    }

    createTable(size);

// накладання мін
    const tdArr = Array.from(document.getElementsByTagName('td'));

    function createMina(size) {
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

    createMina(size);

//Накладання координат в кожну комірку
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

// Встановлення атрибуту коміркам, які мають в собі цифри. Підрахунок цифр.
    numbers.forEach((num) => {
        let coords = num.split(',');
        let td = document.querySelectorAll(`[data-td="${+coords[0]},${+coords[1]}"]`)[0];
        let dataNum = +td.getAttribute('data-num');
        if (!dataNum) dataNum = 0;
        td.setAttribute('data-num', `${dataNum + 1}`);
    })

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

// Функція встановлення прапорців
function flag(td) {
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

// Функція кліку (перевіряє чи є міна, якщо так, кінець гри, якщо ні перевіряє чи має комірка атрибут цифри, якщо так
// відкриває клітинку та встановлює туди цифру з атрибута цифр, якщо ні запускаємо функцію відкриття сусідніх комірок)

function clickTd(td) {
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
function checkTd(td, coordinate) {
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

// Функція подвійного кліку на клітинку з цифрою - якщо навколо неї встановлено таку ж кількість прапорців,
// що зазначено на цифрі цієї комірки, відкриваються всі сусідні комірки
function dblclickTd(td) {
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


// Функція програшу в грі
function endGame(td) {
    const tdArr = Array.from(document.getElementsByTagName('td'));
    gameOver = true;
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

// Функція виграшу в грі
const victory = () => {
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
        gameOver = true;
    }
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




