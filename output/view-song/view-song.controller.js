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
const core_1 = require('@angular/core');
const server_songs_service_1 = require('../songs/server-songs.service');
let ViewSongController = class ViewSongController {
    constructor(songsService) {
        this.songsService = songsService;
    }
    returnSong(req, res, next) {
        this.songsService.getCompleteSongById(req.params.id)
            .then(result => res.send(result.rows))
            .catch(e => next("Error while fetching song " + e));
    }
};
ViewSongController = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_songs_service_1.SongsService])
], ViewSongController);
exports.ViewSongController = ViewSongController;
//# sourceMappingURL=view-song.controller.js.map