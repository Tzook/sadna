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
var word_peek_service_1 = require('../words/word-peek.service');
var core_1 = require('@angular/core');
var FullSongComponent = (function () {
    function FullSongComponent(wordPeekService) {
        this.wordPeekService = wordPeekService;
    }
    FullSongComponent.prototype.ngOnInit = function () {
    };
    FullSongComponent.prototype.viewFullSong = function () {
        this.song = this.wordPeekService.getFullSong();
    };
    FullSongComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'full-song',
            styles: ["\n        section {\n            text-align: center;\n            font-size: 18px;\n        }\n        div {\n            white-space: pre-line;\n        }\n    "],
            template: "\n        <section>\n            <button [hidden]=\"song\" (click)=\"viewFullSong()\">View full song</button>\n            <div *ngIf=\"song\">\n                {{song}}\n            </div>\n        </section>\n    "
        }), 
        __metadata('design:paramtypes', [word_peek_service_1.WordPeekService])
    ], FullSongComponent);
    return FullSongComponent;
}());
exports.FullSongComponent = FullSongComponent;
//# sourceMappingURL=full-song.component.js.map