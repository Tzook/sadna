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
var core_1 = require('@angular/core');
var WordPeekService = (function () {
    function WordPeekService() {
        this.wordMap = new Map();
        this.wordsRows = [];
        this.houseIndexes = {};
    }
    Object.defineProperty(WordPeekService.prototype, "words", {
        set: function (words) {
            var wordsRow = [];
            var currentRow = 0;
            var currentHouse = 0;
            words = words.concat().sort(function (a, b) {
                if (a.row > b.row || (a.row == b.row && a.col > b.col)) {
                    return 1;
                }
                return -1;
            });
            for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
                var word = words_1[_i];
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
                var wordValue = word.word_value.toLowerCase();
                var currentMapvalue = this.wordMap.get(wordValue) || [];
                currentMapvalue.push(word);
                this.wordMap.set(wordValue, currentMapvalue);
            }
            this.wordsRows.push(wordsRow.join(" "));
        },
        enumerable: true,
        configurable: true
    });
    WordPeekService.prototype.getWordRows = function (word) {
        var strings = [];
        var handledRows = new Set();
        var wordsArray = this.wordMap.get(word);
        for (var _i = 0, wordsArray_1 = wordsArray; _i < wordsArray_1.length; _i++) {
            var word_1 = wordsArray_1[_i];
            if (!handledRows.has(word_1.row)) {
                handledRows.add(word_1.row);
                var resultRows = [];
                for (var _a = 0, _b = [-1, 0, 1]; _a < _b.length; _a++) {
                    var j = _b[_a];
                    if (this.wordsRows[word_1.row + j]) {
                        resultRows.push(this.wordsRows[word_1.row + j]);
                    }
                }
                strings.push(resultRows);
            }
        }
        return strings;
    };
    WordPeekService.prototype.getFullSong = function () {
        var fullSong = [];
        for (var i in this.wordsRows) {
            var row = this.wordsRows[i];
            if (this.houseIndexes[i]) {
                fullSong.push("");
            }
            fullSong.push(row);
        }
        return fullSong.join("\n");
    };
    WordPeekService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WordPeekService);
    return WordPeekService;
}());
exports.WordPeekService = WordPeekService;
//# sourceMappingURL=word-peek.service.js.map