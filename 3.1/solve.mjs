import {promises as fsp} from "fs"

const input = (await fsp.readFile('input', 'utf8')).trim().split('\n');
const dimensions = {
    width: input[0].length,
    height: input.length
};

function parseNumber(row, col) {
    let value = 0;
    let length = 0;
    do {
        value = value * 10 + parseInt(input[row][col + length], 10);
        length += 1;
    } while(input[row][col + length]?.match(/\d/));

    return {
        value,
        length
    };
}

function hasAdjacentSymbol(row, col, length) {
    const isSymbol = (r, c) => {
        const result = !!input[r]?.[c]?.match(/[^.^0-9]/);
        //console.log("Scanning " + c + 'x' + r + ": " + input[r]?.[c] + " = " + result);
        return result;
}

    if (isSymbol(row - 1, col - 1)) { return true; }
    if (isSymbol(row, col-1)) { return true; }
    if (isSymbol(row + 1, col - 1)) { return true; }

    if (isSymbol(row - 1, col + length)) { return true; }
    if (isSymbol(row, col + length)) { return true; }
    if (isSymbol(row + 1, col + length)) { return true; }

    for (let offset = 0; offset < length; offset += 1) {
        if (isSymbol(row - 1, col + offset)) { return true; }
        if (isSymbol(row + 1, col + offset)) { return true; }
    }
    return false;
}

const numbers = [];

for (let row = 0; row < dimensions.height; row += 1) {
    for (let col = 0; col < dimensions.width; col += 1) {
        if (input[row][col].match(/\d/)) {
            // we found a number
            const {value, length} = parseNumber(row, col);
            const ok = hasAdjacentSymbol(row, col, length);
            if (ok) {
                numbers.push(value);
            }
            col += length;
        }
    }
}


console.log(numbers.reduce((a,b) => a+b));
