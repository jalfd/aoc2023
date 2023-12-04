import {promises as fsp} from "fs"

const input = (await fsp.readFile('input', 'utf8')).trim().split('\n');

const lines = input.map(line => line.match(/^Card +(\d+):([^|]+)\|([^|]+)$/));
function parseNumberList(list) {
    return new Set(list.trim().split(/ +/).map(n => parseInt(n, 10)));
}
const cards = lines.map(line => ({
    id: parseInt(line[1]),
    winners: parseNumberList(line[2]),
    actual: parseNumberList(line[3])
}));

function intersectionSize(card) {
    const intersection = [];
    for (const winner of card.winners) {
        if (card.actual.has(winner)) {
            intersection.push(winner);
        }
    }
    return intersection.length;
}

function cardValue(card) {
    const v = intersectionSize(card);
    if (v === 0) { return 0; }
    return Math.pow(2, v - 1);
    
}

console.log(cards.map(cardValue).reduce((a,b) => a+b));
