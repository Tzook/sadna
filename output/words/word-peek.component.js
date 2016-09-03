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
var word_peek_service_1 = require('./word-peek.service');
var core_1 = require('@angular/core');
var WordPeekComponent = (function () {
    function WordPeekComponent(wordPeekService) {
        this.wordPeekService = wordPeekService;
    }
    WordPeekComponent.prototype.ngOnInit = function () { };
    WordPeekComponent.prototype.showRows = function () {
        this.wordRows = this.wordRows || this.wordPeekService.getWordRows(this.word);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WordPeekComponent.prototype, "word", void 0);
    WordPeekComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'word-peek',
            styles: ["\n        :host {\n            font-size: 18px;\n            line-height: 30px;\n            letter-spacing: 2px;\n        }\n        :host:not(:last-child):after {\n            content: \" | \";\n        }\n        .rows:not(:last-child) {\n            margin-bottom: 20px;\n            padding-bottom: 20px;\n            border-bottom: 2px dotted;\n        }\n    "],
            template: "\n        <callout-wrap (calloutShown)=\"showRows()\">\n            <pre-callout>{{word}}</pre-callout>\n            <callout>\n                <div class=\"rows\" *ngFor=\"let wordRow of wordRows\">\n                    <div *ngFor=\"let row of wordRow\">\n                        {{row}}\n                    </div>\n                </div>\n            </callout>\n        </callout-wrap>\n    ",
        }), 
        __metadata('design:paramtypes', [word_peek_service_1.WordPeekService])
    ], WordPeekComponent);
    return WordPeekComponent;
}());
exports.WordPeekComponent = WordPeekComponent;
//# sourceMappingURL=word-peek.component.js.map