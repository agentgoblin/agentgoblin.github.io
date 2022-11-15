let events = [
    [
    "Бандит",
    "Бродяга",
    "Грабитель",
    "Дерущиеся",
    "Животное",
    "Житель",
    "Жулик",
    "Карманник",
    "Кошка",
    "Патруль",
    "Извозчик",
    "Попрошайка",
    "Проститутка",
    "Птица",
    "Пьяница",
    "Сектант",
    "Собака",
    "Торгаш",
    "Уличный артист",
    "Хулиган",
    ],
    [
    "Агрессивный",
    "Без памяти",
    "Без сознания",
    "Больной",
    "Глухой",
    "Дурачок",
    "Заика",
    "Испуганный",
    "Калека",
    "Лжец",
    "Мертвый",
    "Немой",
    "Побитый",
    "Пьяный",
    "Раненый",
    "Ребенок",
    "Озлобленный",
    "С просьбой",
    "Слепой",
    "Убегающий",
    ],
    [
    "Глазок",
    "Картина",
    "Ловушка",
    "Надпись",
    "Открытая дверь",
    "Открытое окно",
    "Рисунок",
    "Скрытая кнопка",
    "Скрытый рычаг",
    "Скрытый люк",
    "Скрытый проход",
    "Следы вещества",
    "Следы грязи",
    "Следы взлома",
    "Следы крови",
    "Следы починки",
    "Следы предмета",
    "Следы существа",
    "Следы удара",
    "Тайник",
    ],
    [
    "Деньги",
    "Ёмкость с чем-то",
    "Записка",
    "Игрушка",
    "Ключ",
    "Кольцо",
    "Кулон",
    "Лоскут одежды",
    "Обломок чего-то",
    "Одежда, обувь",
    "Орудие разбоя",
    "Орудие труда",
    "Отходы",
    "Печатка",
    "Письмо",
    "Платок",
    "Серьга",
    "Талисман бога",
    "Фекалии",
    "Шкатулка",
    ]
];

let rollDice = (M) => Math.floor(Math.random() * M); /* return int from range 0..M-1 */

let rollCellIndex = () => [rollDice(events.length), rollDice(events[0].length)]; /* return index [col, row] */

function writeLog(newText) {
    let node = document.getElementById('log');
    let newNode = document.createElement('p');
    newNode.appendChild(document.createTextNode(newText));
    node.insertBefore(newNode, node.firstChild);
    while (node.children.length > 20) {
        node.removeChild(node.lastChild);
    }
}

function getEventText(c, r) {
    return events[c][r]
}

function generate() {
    pair1 = rollCellIndex();
    pair2 = rollCellIndex();
    //~ pair2 = pair1;
    drawTable(...pair1, ...pair2);
    if ( pair1[0] == pair2[0] && pair1[1] == pair2[1] ) {
        writeLog(getEventText(...pair1))
    } else {
        writeLog(getEventText(...pair1) + ' ' + getEventText(...pair2))
    }
}

function drawTable(c1, r1, c2, r2) {
    let node = document.getElementById('table');
    while (node.children.length > 0) {
        node.removeChild(node.lastChild);
    }
    if ( ! document.getElementById('showTable').checked ) {
        return;
    }
    let table = document.createElement('table')
    for (let row = 0; row < events[0].length; row++) {
        let rowNode = document.createElement('tr');
        for (let col = 0; col < events.length; col++) {
            let cellNode = document.createElement('td');
            cellNode.appendChild(document.createTextNode(events[col][row]));

            let bg = 0; // 1 - yellow, 2 - red
            if ( row == r1 && col == c1 ) {
                bg += 1;
            }
            if ( row == r2 && col == c2 ) {
                bg += 1;
            }
            if ( bg == 1 ) { cellNode.classList.add('oneshot'); }
            if ( bg == 2 ) { cellNode.classList.add('twoshot'); }

            rowNode.appendChild(cellNode);
        }
        table.appendChild(rowNode);
    }
    node.appendChild(table);
}

function cleanup() {
    let node = document.getElementById('log');
    while (node.children.length > 0) {
        node.removeChild(node.lastChild);
    }
    drawTable();
}
