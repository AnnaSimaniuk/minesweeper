'use strict'

const table = document.querySelector('table');
const tbody = document.createElement('tbody')
table.append(tbody)

export function createTable(size) {
    for (let i = 0; i < size; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            const td = document.createElement('td');
            tr.append(td)
        }
        tbody.append(tr);
    }
}