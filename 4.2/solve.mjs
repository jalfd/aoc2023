import {promises as fsp} from "fs"

const input = (await fsp.readFile('input', 'utf8')).trim().split('\n');

const lines = input.map(line => line.match(/^Card +(\d+):([^|]+)\|([^|]+)$/));
function parseNumberList(list) {
    return new Set(list.trim().split(/ +/).map(n => parseInt(n, 10)));
}
const cards = lines.map(line => ({
    id: parseInt(line[1]),
    winners: parseNumberList(line[2]),
    actual: parseNumberList(line[3]),
    count: 1
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

for (let i = 0; i < cards.length; i += 1) {
    const w = intersectionSize(cards[i]);
    for (let j = 0; j < w; j += 1) {
        if (i + j + 1 < cards.length) {
            cards[i + j + 1].count += cards[i].count;
        }
    }
}

console.log(cards.map(c => c.count).reduce((a,b) => a+b));
