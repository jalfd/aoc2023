import {promises as fsp} from "fs"

const input = (await fsp.readFile('input', 'utf8')).trim().split('\n');
const dimensions = {
    width: input[0].length,
    height: input.length
};

function parseNumber(row, col) {
    // scroll back to find start point
    while (input[row][col - 1]?.match(/\d/)) {
        col -= 1;
    }
    let value = 0;
    let length = 0;
    do {
        value = value * 10 + parseInt(input[row][col + length], 10);
        length += 1;
    } while(input[row][col + length]?.match(/\d/));

    return {
        value,
        start_pos: `${col}x${row}`
    };
}

function gearRatio(row, col) {
    const isDigit = (r, c) => {
        const result = !!input[r]?.[c]?.match(/[0-9]/);
        return result;
    }
    const adjacent_numbers = new Map();

    const checkAdjacentNumber = (r, c) => {
        if (isDigit(r, c)) { 
            const {value, start_pos} = parseNumber(r, c);
            adjacent_numbers.set(start_pos, value);
        }
    }

    checkAdjacentNumber(row - 1, col - 1);
    checkAdjacentNumber(row - 1, col );
    checkAdjacentNumber(row - 1, col + 1);
    checkAdjacentNumber(row, col - 1);
    checkAdjacentNumber(row, col + 1);
    checkAdjacentNumber(row + 1, col - 1);
    checkAdjacentNumber(row + 1, col );
    checkAdjacentNumber(row + 1, col + 1);

    if (adjacent_numbers.size !== 2) {
        console.log("Rejecting: " + col + 'x' + row, adjacent_numbers.size, "adjacent numbers:");
        for (const adj of adjacent_numbers) {
        console.log("  - ", adj);}
        return 0;
    }
    return [...adjacent_numbers.values()].reduce((a,b) => a*b, 1);
}

const numbers = [];

for (let row = 0; row < dimensions.height; row += 1) {
    for (let col = 0; col < dimensions.width; col += 1) {
        if (input[row][col] === '*') {
            const r = gearRatio(row, col);
            if (r) {
                console.log("Found gear at " + col + 'x' + row);
                numbers.push(r);
            }
        }
    }
}


console.log(numbers.reduce((a,b) => a+b));
