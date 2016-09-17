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
var punctuation_constants_1 = require('../words/punctuation.constants');
var core_1 = require('@angular/core');
var SongAnalyzeService = (function () {
    function SongAnalyzeService() {
    }
    SongAnalyzeService.prototype.analyze = function (text, skipPunctuation) {
        return new Promise(function (resolve) {
            var wordsResult = {
                words: [],
                wordsInSong: [],
                letters: 0,
            };
            var row = 0;
            var houseNum = 0;
            var houses = text.split(punctuation_constants_1.HOUSE_SPLIT_REGEX);
            for (var _i = 0, houses_1 = houses; _i < houses_1.length; _i++) {
                var house = houses_1[_i];
                var sentenceNum = 0;
                var sentences = house.split(punctuation_constants_1.SENTENCE_SPLIT_REGEX);
                for (var _a = 0, sentences_1 = sentences; _a < sentences_1.length; _a++) {
                    var sentence = sentences_1[_a];
                    var col = 0;
                    var wordNum = 0;
                    var words = sentence.split(punctuation_constants_1.WORD_SPLIT_REGEX);
                    for (var _b = 0, words_1 = words; _b < words_1.length; _b++) {
                        var word = words_1[_b];
                        var wordParts = word.split(punctuation_constants_1.PUNCTUATIONS_REGEX);
                        for (var _c = 0, wordParts_1 = wordParts; _c < wordParts_1.length; _c++) {
                            var wordPart = wordParts_1[_c];
                            if (!wordPart.length) {
                                continue;
                            }
                            var isPunctuation = punctuation_constants_1.PUNCTUATIONS_REGEX.test(wordPart);
                            if (isPunctuation && skipPunctuation) {
                                continue;
                            }
                            var wordObj = {
                                value: wordPart,
                                is_punctuation: isPunctuation
                            };
                            var wordInSong = {
                                col: col,
                                row: row,
                                house: houseNum,
                                sentence: sentenceNum,
                                word_num: wordNum,
                            };
                            wordsResult.words.push(wordObj);
                            wordsResult.wordsInSong.push(wordInSong);
                            wordsResult.letters += wordPart.length;
                            wordNum++;
                            col++;
                        }
                    }
                    row++;
                    sentenceNum++;
                }
                houseNum++;
            }
            resolve(wordsResult);
        });
    };
    SongAnalyzeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SongAnalyzeService);
    return SongAnalyzeService;
}());
exports.SongAnalyzeService = SongAnalyzeService;
//# sourceMappingURL=song-analyze.service.js.map