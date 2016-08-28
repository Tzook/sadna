"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
let WordPeekService = class WordPeekService {
    constructor() {
        this.wordMap = new Map();
        this.wordsRows = [];
        this.houseIndexes = {};
    }
    set words(words) {
        let wordsRow = [];
        let currentRow = 0;
        let currentHouse = 0;
        words = words.concat().sort((a, b) => {
            if (a.row > b.row || (a.row == b.row && a.col > b.col)) {
                return 1;
            }
            return -1;
        });
        for (let word of words) {
            if (word.row !== currentRow) {
                // push a new row
                currentRow = word.row;
                this.wordsRows.push(wordsRow.join(" "));
                wordsRow = [];
            }
            if (word.house !== currentHouse) {
                // push a new house
                currentHouse = word.house;
                this.houseIndexes[word.row] = true;
            }
            // map word to its objects
            wordsRow.push(word.word_value);
            let wordValue = word.word_value.toLowerCase();
            let currentMapvalue = this.wordMap.get(wordValue) || [];
            currentMapvalue.push(word);
            this.wordMap.set(wordValue, currentMapvalue);
        }
        this.wordsRows.push(wordsRow.join(" "));
    }
    getWordRows(word) {
        let strings = [];
        let handledRows = new Set();
        let wordsArray = this.wordMap.get(word);
        for (let word of wordsArray) {
            if (!handledRows.has(word.row)) {
                handledRows.add(word.row);
                let resultRows = [];
                for (let j of [-1, 0, 1]) {
                    if (this.wordsRows[word.row + j]) {
                        resultRows.push(this.wordsRows[word.row + j]);
                    }
                }
                strings.push(resultRows);
            }
        }
        return strings;
    }
    getFullSong() {
        let fullSong = [];
        for (let i in this.wordsRows) {
            let row = this.wordsRows[i];
            if (this.houseIndexes[i]) {
                fullSong.push("");
            }
            fullSong.push(row);
        }
        return fullSong.join("\n");
    }
};
WordPeekService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], WordPeekService);
exports.WordPeekService = WordPeekService;
//# sourceMappingURL=word-peek.service.js.map