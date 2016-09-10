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
var songs_peek_service_1 = require('./songs-peek.service');
var view_song_service_1 = require('../view-song/view-song.service');
var core_1 = require('@angular/core');
var SongsPeekComponent = (function () {
    function SongsPeekComponent(songsPeekService, viewSongService) {
        this.songsPeekService = songsPeekService;
        this.viewSongService = viewSongService;
        this.fetched = false;
    }
    SongsPeekComponent.prototype.fillSongs = function () {
        var _this = this;
        if (!this.fetched) {
            this.fetched = true;
            this.songsPeekService.getSongs(this.word)
                .subscribe(function (success) { return _this.songs = success.json(); }, function (error) { return console.log(error); });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SongsPeekComponent.prototype, "word", void 0);
    SongsPeekComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'songs-peek',
            styles: ["\n        :host {\n            line-height: 25px;\n            letter-spacing: 1.5px;\n        }\n        :host:not(:last-child):after {\n            content: \" | \";\n        }\n        div {\n            display: flex;\n            align-items: flex-end;\n            justify-content: space-between;\n            width: 100%;\n        }\n        button {\n            flex-shrink: 0;\n        }\n        div:not(:last-child) {\n            margin-bottom: 20px;\n            padding-bottom: 20px;\n            border-bottom: 2px dotted;\n        }\n    "],
            template: "\n        <callout-wrap (calloutShown)=\"fillSongs()\" delay=\"100\">\n            <pre-callout>{{word}}</pre-callout>\n            <callout>\n                <div *ngFor=\"let song of songs\">\n                    <song-info [song]=\"song\"></song-info>\n                    <button [routerLink]=\"viewSongService.getSongUrl(song)\">View song</button>\n                </div>\n                <div *ngIf=\"songs && songs.length === 0\">The word does not appear anywhere.</div>\n                <div *ngIf=\"!songs\">Loading...</div>\n            </callout>\n        </callout-wrap>\n    "
        }), 
        __metadata('design:paramtypes', [songs_peek_service_1.SongsPeekService, view_song_service_1.ViewSongService])
    ], SongsPeekComponent);
    return SongsPeekComponent;
}());
exports.SongsPeekComponent = SongsPeekComponent;
//# sourceMappingURL=songs-peek.component.js.map