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
let UniqueWordsService = class UniqueWordsService {
    constructor() {
    }
    getUniqueWords(words, sorted) {
        let resultWords = [];
        let seenWords = new Set();
        for (let word of words) {
            let wordValue = word.word_value.toLowerCase();
            if (!word.is_punctuation && !seenWords.has(wordValue)) {
                seenWords.add(wordValue);
                resultWords.push(wordValue);
            }
        }
        return sorted ? this.sortWords(resultWords) : resultWords;
    }
    sortWords(words) {
        return words.sort((a, b) => {
            return a > b ? 1 : -1;
        });
    }
};
UniqueWordsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], UniqueWordsService);
exports.UniqueWordsService = UniqueWordsService;
//# sourceMappingURL=unique-words.service.js.map