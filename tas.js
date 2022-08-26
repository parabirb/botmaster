const Solver = require("./index");
const { question } = require("readline-sync");
let globalSolver;

function guess(word) {
    let result = question(`Result of ${word}? (Current word pool: ${globalSolver.possibleGuesses.length}) `);
    return result.split("").map(char => +char);
}

while (1) {
    let solver = new Solver(guess);
    globalSolver = solver;
    let lastGuess = false;
    while (!lastGuess) {
        lastGuess = solver.step();
    }
}