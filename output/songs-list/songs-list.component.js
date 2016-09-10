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
var songs_list_service_1 = require('./songs-list.service');
var view_song_service_1 = require('../view-song/view-song.service');
var core_1 = require('@angular/core');
var SongsListComponent = (function () {
    function SongsListComponent(songsListService, viewSongService) {
        this.songsListService = songsListService;
        this.viewSongService = viewSongService;
    }
    SongsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.list) {
            this.songsListService.getSongs()
                .subscribe(function (success) { return _this.list = success.json(); }, function (error) { return console.log(error); });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SongsListComponent.prototype, "list", void 0);
    SongsListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'songs-list',
            styles: ["\n        div {\n            display: flex;\n            justify-content: space-between;\n            align-items: flex-end;\n            padding: 15px;\n            margin-bottom: 20px;\n            border: 1px solid;\n            border-radius: 2px;\n            box-shadow: 1px 2px 2px -1px rgba(0,0,0,.6);\n        }\n    "],
            template: "\n        <div *ngFor=\"let song of list\" class=\"animated fadeInDown\">\n            <song-info [song]=\"song\"></song-info>\n            <span>\n                <button [routerLink]=\"viewSongService.getSongUrl(song)\">View song</button>\n            </span>\n        </div>\n    ",
            viewProviders: [view_song_service_1.ViewSongService, songs_list_service_1.SongsListService]
        }), 
        __metadata('design:paramtypes', [songs_list_service_1.SongsListService, view_song_service_1.ViewSongService])
    ], SongsListComponent);
    return SongsListComponent;
}());
exports.SongsListComponent = SongsListComponent;
//# sourceMappingURL=songs-list.component.js.map