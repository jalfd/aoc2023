import {promises as fsp} from "fs"

const input = (await fsp.readFile('input', 'utf8')).trim().split('\n');

const seeds_line = input[0].match(/^seeds:([ 0-9]+)$/);
const seeds = seeds_line[1].trim().split(/ +/).map(str => parseInt(str, 10));

const mapping_lines= input.slice(1);

const mappings = [];
let cur_mapping = null;

function finalizeMapping() {
    if (!cur_mapping) { return; }
    cur_mapping.maps.sort((l, r) => l.src - r.src);
    mappings.push(cur_mapping);
    cur_mapping = null;
}

for (let i = 0; i < mapping_lines.length; i += 1) {
    const line = mapping_lines[i];
    const m = line.match(/^(.*) map:/);
    if (m) {
        const name = m[1].trim();
        cur_mapping = {
            name,
            maps: []
        };
    }
    else if (line.match(/^[ 0-9]+$/)) {
        const [dst, src, size] = line.split(/ +/).map(str => parseInt(str, 10));
        cur_mapping.maps.push({src, dst, size});
    }
    else
    {
        finalizeMapping();
    }
}
finalizeMapping();

function performMapping(mapping, val) {
    for (const map of mapping.maps) {
        // go through entries in map until we find one that is in range or go past our target
        if (map.src > val) {
            break;
        }
        if (map.src + map.size > val) {
            const offset = val - map.src;
            return map.dst + offset;
        }
    }
    return val;
}


function seedLocation(seed) {
    console.log("Seed:", seed);
    let val = seed;
    for (const mapping of mappings) {
        const old = val;
        val = performMapping(mapping, val);
        console.log("  ", old, "->", val, `(${mapping.name})`);
    }
    return val;
}

const locations = seeds.map(seedLocation)

console.log(Math.min(...locations));
