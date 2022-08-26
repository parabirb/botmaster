/*
    sex
*/
const data = require("./data");

class Wordle {
    constructor(i) {
        this.word = data[i];
    }
    guess(word) {
        let array = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            if (word[i] === this.word[i]) {
                array[i] = 2;
            }
        }
        for (let i = 0; i < 5; i++) {
            if (this.word.includes(word[i]) && array[i] !== 2) {
                array[i] = 1;
            }
        }
        return array;
    }
}

module.exports = Wordle;