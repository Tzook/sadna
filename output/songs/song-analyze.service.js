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
const PUNCTUATIONS = /([,."?!])/g;
let SongAnalyzeService = class SongAnalyzeService {
    constructor() {
    }
    analyze(text) {
        return new Promise(resolve => {
            let wordsResult = {
                words: [],
                wordsInSong: [],
            };
            let row = 0;
            let houseNum = 0;
            let houses = text.split(/\n{2,}/g);
            for (let house of houses) {
                if (house.length === 0) {
                    houseNum++;
                }
                else {
                    let sentenceNum = 0;
                    let wordNum = 0;
                    let sentences = house.split(/\n/g);
                    for (let sentence of sentences) {
                        let col = 0;
                        let words = sentence.split(/\s/g);
                        for (let word of words) {
                            let wordParts = word.split(PUNCTUATIONS);
                            for (let wordPart of wordParts) {
                                if (wordPart.length) {
                                    let wordObj = {
                                        value: wordPart,
                                        is_punctuation: PUNCTUATIONS.test(wordPart)
                                    };
                                    let wordInSong = {
                                        col,
                                        row,
                                        house: houseNum,
                                        sentence: sentenceNum,
                                        word_num: wordNum,
                                    };
                                    wordsResult.words.push(wordObj);
                                    wordsResult.wordsInSong.push(wordInSong);
                                    wordNum++;
                                    col++;
                                }
                            }
                        }
                        row++;
                        sentenceNum++;
                    }
                }
            }
            resolve(wordsResult);
        });
    }
};
SongAnalyzeService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], SongAnalyzeService);
exports.SongAnalyzeService = SongAnalyzeService;
//# sourceMappingURL=song-analyze.service.js.map