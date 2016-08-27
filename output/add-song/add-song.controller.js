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
const song_analyze_service_1 = require('../songs/song-analyze.service');
const server_songs_service_1 = require('../songs/server-songs.service');
const core_1 = require('@angular/core');
let AddSongController = class AddSongController {
    constructor(songAnalyzeService, songsService) {
        this.songAnalyzeService = songAnalyzeService;
        this.songsService = songsService;
    }
    processSong(req, res, next) {
        let model = req.body.model;
        this.songAnalyzeService.analyze(model.text)
            .then(resultWords => {
            req.body.words = resultWords.words;
            req.body.wordsInSong = resultWords.wordsInSong;
            next();
        });
    }
    insertSong(req, res, next) {
        this.songsService.loadSong(req.body.model, req.body.words, req.body.wordsInSong)
            .then(() => res.send())
            .catch(e => next(e));
    }
};
AddSongController = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [song_analyze_service_1.SongAnalyzeService, server_songs_service_1.SongsService])
], AddSongController);
exports.AddSongController = AddSongController;
//# sourceMappingURL=add-song.controller.js.map