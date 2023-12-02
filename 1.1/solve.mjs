import {promises as fsp} from "fs"

const input = (await fsp.readFile('input', 'utf8')).trim().split('\n');

const vals = [];
let i = 0;
for (const line of input) {
    const m_first = line.match(/^[^0-9]*([0-9])/);
    const m_last = line.match(/([0-9]?)[^0-9]*$/);

    vals.push(parseInt(m_first[1] + m_last[1], 10));
}

console.log(vals.reduce((a,b) => a + b));
