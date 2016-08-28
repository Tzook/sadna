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
const server_songs_service_1 = require('../songs/server-songs.service');
const server_groups_service_1 = require('../groups/server-groups.service');
const server_words_service_1 = require('../words/server-words.service');
const xml_service_1 = require('../db/backup/xml.service');
const core_1 = require('@angular/core');
let SongsRouter = class SongsRouter {
    constructor(_songsService, _groupsService, _xmlService, _wordsService) {
        this._songsService = _songsService;
        this._groupsService = _groupsService;
        this._xmlService = _xmlService;
        this._wordsService = _wordsService;
    }
    init(app) {
        this._app = app;
        this._songsService.selectSongStatisticsHouses(1)
            .then(res => {
            console.log('res', res);
        })
            .catch(err => {
            console.log('error', err);
        });
    }
};
SongsRouter = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_songs_service_1.SongsService, server_groups_service_1.GroupsService, xml_service_1.XmlService, server_words_service_1.WordsService])
], SongsRouter);
exports.SongsRouter = SongsRouter;
//# sourceMappingURL=server-songs.router.js.map