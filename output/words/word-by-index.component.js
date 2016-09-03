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
var words_index_service_1 = require('./words-index.service');
var core_1 = require('@angular/core');
var WordByIndexComponent = (function () {
    function WordByIndexComponent(wordsIndexService) {
        this.wordsIndexService = wordsIndexService;
    }
    WordByIndexComponent.prototype.ngOnInit = function () {
        this.wordsIndexService.words = this.words;
    };
    WordByIndexComponent.prototype.searchByRowCol = function (row, col) {
        if (row && col) {
            this.foundWord = this.wordsIndexService.getWordByRowCol(row - 1, col - 1);
        }
    };
    WordByIndexComponent.prototype.searchByHouseSentenceWord = function (house, sentence, word) {
        if (house && sentence && word) {
            this.foundWord = this.wordsIndexService.getWordByHouseSentenceWord(house - 1, sentence - 1, word - 1);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], WordByIndexComponent.prototype, "words", void 0);
    WordByIndexComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'word-by-index',
            styles: ["\n        h2,\n        h3,\n        div {\n            margin-bottom: 10px;\n        }\n    "],
            template: "\n        <h2>Search by index:</h2>\n        <h3 *ngIf=\"foundWord\">Found word: <word-peek [word]=\"foundWord\"></word-peek></h3>\n        <h3 *ngIf=\"foundWord === ''\">No word found in the given index</h3>\n        <div>\n            <label for=\"row\">Row: </label>\n            <input type=\"number\" max=\"9999\" min=\"1\" id=\"row\" #row (input)=\"searchByRowCol(row.value, col.value)\">\n            <label for=\"col\">Col: </label>\n            <input type=\"number\" max=\"9999\" min=\"1\" id=\"col\" #col (input)=\"searchByRowCol(row.value, col.value)\">\n        </div>\n        <div>\n            <label for=\"house\">House: </label>\n            <input type=\"number\" max=\"9999\" min=\"1\" id=\"house\" #house (input)=\"searchByHouseSentenceWord(house.value, sentence.value, word.value)\">\n            <label for=\"sentence\">Sentence: </label>\n            <input type=\"number\" max=\"9999\" min=\"1\" id=\"sentence\" #sentence (input)=\"searchByHouseSentenceWord(house.value, sentence.value, word.value)\">\n            <label for=\"word\">Word: </label>\n            <input type=\"number\" max=\"9999\" min=\"1\" id=\"word\" #word (input)=\"searchByHouseSentenceWord(house.value, sentence.value, word.value)\">\n        </div>\n    ",
            viewProviders: [words_index_service_1.WordsIndexService]
        }), 
        __metadata('design:paramtypes', [words_index_service_1.WordsIndexService])
    ], WordByIndexComponent);
    return WordByIndexComponent;
}());
exports.WordByIndexComponent = WordByIndexComponent;
//# sourceMappingURL=word-by-index.component.js.map