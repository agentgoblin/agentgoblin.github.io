let mapa;

let randint = (M) => Math.floor(Math.random() * M); /* return int from range 0..M-1 */

let rollDice = (M) => Math.floor(Math.random() * M) + 1; /* return int from range 1..M */

let rolld6 = () => Math.floor(Math.random() * 6) + 1;  /* return int from range 1..6 */

let ror = (lst) => lst.push(lst.shift()); /* roll array to right */

let rol = (lst) => lst.unshift(lst.pop()); /* roll array to left */


function shift(lst) {
    let dr = rollDice(3);
    if ( dr == 1 ) {
        if ( lst[lst.length-1] == 0 ) { return }
        ror(lst);
        return
    }
    if ( dr == 3) {
        if ( lst[0] == 0 ) { return }
        rol(lst);
        return
    }
}


function rotate(lst) {
    let dr = rollDice(3)
    if ( dr == 1 ) {
        ror(lst);
        return
    }
    if ( dr == 3) {
        rol(lst);
        return
    }
}


function mline(num, length) {
    if ( num > length ) { throw new RangeError("Number of significant charecters longer than line length value.") }
    let zeroes = length - num;
    let head = Math.floor(zeroes / 2);
    let tail = Math.ceil(zeroes / 2);
    let line = [...Array(head)].map(() => 0);
    line.push( ...[...Array(num)].map(() => rolld6()) );
    line.push( ...[...Array(tail)].map(() => 0) );
    shift(line);
    return line
}


function make_mapa(dices) {
    let width = Math.ceil(Math.sqrt(dices)) + 1;
    let lines = [...Array(width).keys()];
    let vector = [...Array(width)].map(() => 0);
    for (let _ of Array(dices).keys()) {
        let idx = randint(lines.length);
        let lineno = lines[idx];
        vector[lineno] += 1;
        if (vector[lineno] == width) {
            lines.splice(lines.indexOf(lineno), 1)
        }
    }
    while (vector.indexOf(0) != -1) {
        vector.splice(vector.indexOf(0), 1);
    }
    let mapa = []
    for (let element of vector) {
        mapa.push(mline(element, width));
    }
    return mapa
}


function fromCode() {
    let code = document.getElementById('mapCode').value;
    let vector = code.split('-');
    mapa = [];
    for (v of vector) {
        mapa.push(v.split('').map((x) => Number(x)));
    }
    drawTable();
}


function toCode() {
    let mapString = mapa.map(x => x.join('')).join('-');
    document.getElementById('mapCode').value = mapString;
}


function generate() {
    let dices = Number(document.getElementById('dicesCount').value);
    mapa = make_mapa(dices);
    drawTable();
}


function drawTable() {
    if (typeof mapa === 'undefined') {
        mapa = [[1,2,3],[4,5,6]];
    }
    toCode();
    let node = document.getElementById('table');
    while (node.children.length > 0) {
        node.removeChild(node.lastChild);
    }
    let table = document.createElement('table');
    for (let row = 0; row < mapa.length; row++) {
        let rowNode = document.createElement('tr');
        for (let col = 0; col < mapa[row].length; col++) {
            let cellNode = document.createElement('td');
            /* add dice image */
            let diceImg = document.createElement('img');
            if ( document.getElementById('showAsDices').checked ) {
                diceImg.src = "../images/dice" + mapa[row][col] + ".png";
            } else {
                diceImg.src = "../images/map" + mapa[row][col] + ".png";
            }
            /* add alt text for images */
            if ( mapa[row][col] == 0 ) {
                alttext = "";
            } else {
                alttext = "[ " + mapa[row][col] + " ]";
            }
            diceImg.alt = alttext;
            cellNode.appendChild(diceImg);
            rowNode.appendChild(cellNode);
        }
        table.appendChild(rowNode);
    }
    node.appendChild(table);
}
