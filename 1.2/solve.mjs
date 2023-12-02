import {promises as fsp} from "fs"

function parse(val) {
    switch (val) {
        case "one":
            return 1;
        case "two":
            return 2;
        case "three":
            return 3;
        case "four":
            return 4;
        case "five":
            return 5;
        case "six":
            return 6;
        case "seven":
            return 7;
        case "eight":
            return 8;
        case "nine":
            return 9;
        default:
            return parseInt(val, 10);
    }
}


const input = (await fsp.readFile('input', 'utf8')).trim().split('\n');

const vals = [];
let i = 0;
for (const line of input) {
    /(?:one)(?:two)(?:three)(?:four)(?:five)(?:six)(?:seven)(?:eight)(?:nine)(?:[0-9])/
    const m_first = line.match(/.*?((?:one)|(?:two)|(?:three)|(?:four)|(?:five)|(?:six)|(?:seven)|(?:eight)|(?:nine)|(?:[0-9]))/);
    const m_last = line.match(/.*((?:one)|(?:two)|(?:three)|(?:four)|(?:five)|(?:six)|(?:seven)|(?:eight)|(?:nine)|(?:[0-9]))/);

    vals.push(parse(m_first[1]) * 10 + parse(m_last[1]));
}

console.log(vals.reduce((a,b) => a + b));
