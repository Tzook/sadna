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
var router_1 = require('@angular/router');
var view_song_service_1 = require('./view-song.service');
var unique_words_service_1 = require('../words/unique-words.service');
var word_peek_service_1 = require('../words/word-peek.service');
var core_1 = require('@angular/core');
var ViewSongComponent = (function () {
    function ViewSongComponent(viewSongService, uniqueWordsService, wordPeekService, route) {
        this.viewSongService = viewSongService;
        this.uniqueWordsService = uniqueWordsService;
        this.wordPeekService = wordPeekService;
        this.route = route;
        this.uniqueWords = [];
        this.words = [];
    }
    ViewSongComponent.prototype.ngOnInit = function () {
        var _this = this;
        var params = this.route.snapshot.params;
        this.song = params;
        this.viewSongService.getSong(params["id"])
            .subscribe(function (success) {
            _this.words = success.json();
            _this.wordPeekService.words = _this.words;
            _this.uniqueWords = _this.uniqueWordsService.getUniqueWords(_this.words, true);
        }, function (error) { return console.log(error); });
    };
    ViewSongComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'view-song',
            styles: ["\n        :host {\n            display: block;\n            margin-bottom: 50px;\n        }\n        song-info {\n            text-align: center;\n        }\n        #words {\n            margin: 40px 0 20px;\n        }\n        h2 {\n            margin-bottom: 10px;\n        }\n    "],
            template: "\n        <song-info [song]=\"song\"></song-info>\n        <div id=\"words\">\n            <h2>Words in the song:</h2>\n            <word-peek *ngFor=\"let word of uniqueWords\" [word]=\"word\"></word-peek>\n        </div>\n        <word-by-index *ngIf=\"words.length\" [words]=\"words\"></word-by-index>\n        <full-song *ngIf=\"uniqueWords.length\"></full-song>\n    ",
            providers: [word_peek_service_1.WordPeekService],
            viewProviders: [view_song_service_1.ViewSongService, unique_words_service_1.UniqueWordsService]
        }), 
        __metadata('design:paramtypes', [view_song_service_1.ViewSongService, unique_words_service_1.UniqueWordsService, word_peek_service_1.WordPeekService, router_1.ActivatedRoute])
    ], ViewSongComponent);
    return ViewSongComponent;
}());
exports.ViewSongComponent = ViewSongComponent;
//# sourceMappingURL=view-song.component.js.map