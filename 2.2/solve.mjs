import {promises as fsp} from "fs"

const input = (await fsp.readFile('input', 'utf8')).trim().split('\n');

const games = [];

function parseGame(line) {
    const m = line.match(/^Game (\d+):(.*)/);
    const id = m[1];
    const draws = m[2].split(';');

    const max_seen = {
        red: 0,
        green: 0,
        blue: 0
    }

    for (const draw_str of draws) {
        const drawn = {
            red: draw_str.match(/(\d+) red/)?.[1] ?? '0',
            green: draw_str.match(/(\d+) green/)?.[1] ?? '0',
            blue: draw_str.match(/(\d+) +blue/)?.[1] ?? '0'
        };

        max_seen.red = Math.max(max_seen.red, drawn.red);
        max_seen.green = Math.max(max_seen.green, drawn.green);
        max_seen.blue = Math.max(max_seen.blue, drawn.blue);
    }

    games[id] = max_seen;
}

for (const game_str of input) {
    parseGame(game_str)
}


const powers = games.map((game, id) => game.red * game.green * game.blue);

console.log(powers.reduce((a, b) => a + b));

