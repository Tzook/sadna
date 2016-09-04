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
var LETTERS = /[\w'-]+/g;
var WordsSeparatorService = (function () {
    function WordsSeparatorService() {
    }
    WordsSeparatorService.prototype.separate = function (words) {
        var wordsStrings = words.match(LETTERS);
        var i = 0;
        var result = [];
        for (var _i = 0, wordsStrings_1 = wordsStrings; _i < wordsStrings_1.length; _i++) {
            var word = wordsStrings_1[_i];
            result[i++] = {
                value: word
            };
        }
        return result;
    };
    WordsSeparatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WordsSeparatorService);
    return WordsSeparatorService;
}());
exports.WordsSeparatorService = WordsSeparatorService;
//# sourceMappingURL=words-separator.service.js.map