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
var server_songs_service_1 = require('../songs/server-songs.service');
var SongsListController = (function () {
    function SongsListController(songsService) {
        this.songsService = songsService;
    }
    SongsListController.prototype.returnSongs = function (req, res, next) {
        this.songsService.selectSongs()
            .then(function (result) {
            res.send(result.rows);
        })
            .catch(function (e) {
            next("Error while fetching songs list" + e);
        });
    };
    SongsListController.prototype.returnSongsByWord = function (req, res, next) {
        this.songsService.selectSongsByWord(req.params.word)
            .then(function (result) {
            res.send(result.rows);
        })
            .catch(function (e) {
            next("Error while fetching songs list by word" + e);
        });
    };
    SongsListController = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_songs_service_1.SongsService])
    ], SongsListController);
    return SongsListController;
}());
exports.SongsListController = SongsListController;
//# sourceMappingURL=songs-list.controller.js.map