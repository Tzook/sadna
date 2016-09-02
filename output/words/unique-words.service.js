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
var UniqueWordsService = (function () {
    function UniqueWordsService() {
    }
    UniqueWordsService.prototype.getUniqueWords = function (words, sorted) {
        var resultWords = [];
        var seenWords = new Set();
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var word = words_1[_i];
            var wordValue = word.word_value.toLowerCase();
            if (!word.is_punctuation && !seenWords.has(wordValue)) {
                seenWords.add(wordValue);
                resultWords.push(wordValue);
            }
        }
        return sorted ? this.sortWords(resultWords) : resultWords;
    };
    UniqueWordsService.prototype.sortWords = function (words) {
        return words.sort(function (a, b) {
            return a > b ? 1 : -1;
        });
    };
    UniqueWordsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UniqueWordsService);
    return UniqueWordsService;
}());
exports.UniqueWordsService = UniqueWordsService;
//# sourceMappingURL=unique-words.service.js.map