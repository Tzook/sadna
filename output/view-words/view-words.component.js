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
var view_words_constants_1 = require('./view-words.constants');
var view_words_service_1 = require('./view-words.service');
var words_separator_service_1 = require('../words/words-separator.service');
var songs_peek_service_1 = require('../songs/songs-peek.service');
var view_song_service_1 = require('../view-song/view-song.service');
var groups_service_1 = require('../groups/groups.service');
var core_1 = require('@angular/core');
var WordsComponent = (function () {
    function WordsComponent(route, wordsSeparatorService, viewWordsService, clientGroupsService) {
        this.route = route;
        this.wordsSeparatorService = wordsSeparatorService;
        this.viewWordsService = viewWordsService;
        this.clientGroupsService = clientGroupsService;
        this.songs = [];
    }
    WordsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var params = this.route.snapshot.params;
        if (params[view_words_constants_1.PARAM_WORDS_LIST]) {
            this.wordsList = this.wordsSeparatorService.separate(params[view_words_constants_1.PARAM_WORDS_LIST]);
            if (params[view_words_constants_1.PARAM_IS_EXPRESSION] === "true") {
                this.clientGroupsService.getExpressionPossibilities(params[view_words_constants_1.PARAM_WORDS_LIST])
                    .subscribe(function (success) {
                    _this.songs = success.json();
                    if (!_this.songs || _this.songs.length == 0) {
                        _this.message = "No results found for the expression.";
                    }
                }, function (error) { return console.log(error); });
            }
        }
        else {
            this.viewWordsService.getWords()
                .subscribe(function (success) { return _this.wordsList = success.json(); }, function (error) { return console.log(error); });
        }
    };
    WordsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'words',
            styles: ["\n        #title {\n            margin: 20px 0;\n        }\n    "],
            template: "\n        <h2>Words</h2>\n        <div *ngIf=\"wordsList\">\n            <songs-peek *ngFor=\"let word of wordsList\" [word]=\"word.value\"></songs-peek>\n        </div>\n        <div *ngIf=\"songs.length\">\n            <h2 id=\"title\">The expression appears in the following songs:</h2>\n            <songs-list [list]=\"songs\"></songs-list>\n        </div>\n        <span *ngIf=\"message\">{{message}}</span>\n    ",
            providers: [songs_peek_service_1.SongsPeekService, view_song_service_1.ViewSongService],
            viewProviders: [view_words_service_1.ViewWordsService, words_separator_service_1.WordsSeparatorService, groups_service_1.ClientGroupsService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, words_separator_service_1.WordsSeparatorService, view_words_service_1.ViewWordsService, groups_service_1.ClientGroupsService])
    ], WordsComponent);
    return WordsComponent;
}());
exports.WordsComponent = WordsComponent;
//# sourceMappingURL=view-words.component.js.map