/*
    sex
*/

const data = require("./data");
const Solver = require("./index");
const Wordle = require("./wordle");

const repeats = 1;

console.log(`WORDLE SOLVER TEST SUITE`);

let maxCount = 0;
let minCount = Infinity;
let arr = (new Array(12)).fill(0);

function test() {
    for (let i = 0; i < data.length; i++) {
        const wordle = new Wordle(i);
        const solver = new Solver((word) => wordle.guess(word));
        let count = 0;
        let lastGuess = false;
        while (!lastGuess) {
            count++;
            lastGuess = solver.step();
        }
        if (count > maxCount) maxCount = count;
        else if (count < minCount && count !== 1) minCount = count;
        arr[count - 1]++;
    }
}

for (let i = 0; i < repeats; i++) {
    console.log(`Conducting run ${i} (full dataset).`);
    test();
}

let arr2 = [];
for (let i = 0; i < arr.length; i++) {
    arr2.push(`${i + 1} guesses - ${Math.round((arr[i]/(data.length * repeats))*10000)/100}%`);
}

console.log(`DIAGNOSTICS COMPLETE
Minimum tries: ${minCount} (excluding ${require("./highest")}, which would take 1 try)
Maximum tries: ${maxCount}

Distribution:
${arr2.join("\n")}`);