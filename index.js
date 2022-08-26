/*
    sex
*/
const data = require("./data");
const highest = require("./highest");
const highFinder = require("./highFinder");

let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

class Solver {
    constructor(wordleFunction = null) {
        if (wordleFunction === null) {
            throw new Error("A wordle function is required.");
        }
        this.wordle = wordleFunction;
        this.lastGuess = "";
        this.state = (new Array(5)).fill(0);
        this.keyboard = (new Array(26)).fill(3);
        this.guesses = 0;
        this.possibleGuesses = [...data];
    }
    test(word) {
        this.state = this.wordle(word);
        this.lastGuess = word;
        this.guesses++;
        for (let i = 0; i < 5; i++) {
            this.keyboard[letters.indexOf(word[i])] = this.state[i];
        }
    }
    step() {
        if (this.first) {
            this.test(highest);
        }
        else {
            this.possibleGuesses = this.possibleGuesses.filter((entry) => {
                for (let letter of entry) {
                    if (this.keyboard[letters.indexOf(letter)] === 0) {
                        return false;
                    }
                }
                for (let i = 0; i < 5; i++) {
                    if (this.state[i] === 2 && this.lastGuess[i] !== entry[i]) return false;
                    else if (this.state[i] === 1 && (this.lastGuess[i] === entry[i] || !entry.includes(this.lastGuess[i]))) return false;
                }
                return true;
            });
            let guess = highFinder(this.possibleGuesses);
            this.test(guess);
        }
        for (let item of this.state) {
            if (item !== 2) return false;
        }
        return true;
    }
}

module.exports = Solver;