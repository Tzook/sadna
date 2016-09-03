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
var WordsIndexService = (function () {
    function WordsIndexService() {
        this.rowColMatrix = [];
        this.houseSentenceWordMatrix = [];
    }
    Object.defineProperty(WordsIndexService.prototype, "words", {
        set: function (words) {
            this.songWords = words;
        },
        enumerable: true,
        configurable: true
    });
    WordsIndexService.prototype.getWordByRowCol = function (row, col) {
        if (!this.rowColMatrix.length) {
            this.prepareRowColMatrix();
        }
        return (this.rowColMatrix[row] && this.rowColMatrix[row][col]) || "";
    };
    WordsIndexService.prototype.prepareRowColMatrix = function () {
        for (var _i = 0, _a = this.songWords; _i < _a.length; _i++) {
            var word = _a[_i];
            this.rowColMatrix[word.row] = this.rowColMatrix[word.row] || [];
            this.rowColMatrix[word.row][word.col] = word.word_value;
        }
    };
    WordsIndexService.prototype.getWordByHouseSentenceWord = function (house, sentence, word) {
        if (!this.houseSentenceWordMatrix.length) {
            this.prepareHouseSentenceWordMatrix();
        }
        return (this.houseSentenceWordMatrix[house] && this.houseSentenceWordMatrix[house][sentence] && this.houseSentenceWordMatrix[house][sentence][word]) || "";
    };
    WordsIndexService.prototype.prepareHouseSentenceWordMatrix = function () {
        for (var _i = 0, _a = this.songWords; _i < _a.length; _i++) {
            var word = _a[_i];
            this.houseSentenceWordMatrix[word.house] = this.houseSentenceWordMatrix[word.house] || [];
            this.houseSentenceWordMatrix[word.house][word.sentence] = this.houseSentenceWordMatrix[word.house][word.sentence] || [];
            this.houseSentenceWordMatrix[word.house][word.sentence][word.word_num] = word.word_value;
        }
    };
    WordsIndexService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WordsIndexService);
    return WordsIndexService;
}());
exports.WordsIndexService = WordsIndexService;
//# sourceMappingURL=words-index.service.js.map