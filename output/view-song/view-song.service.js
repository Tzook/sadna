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
var http_1 = require('@angular/http');
var view_song_constants_1 = require('./view-song.constants');
var routes_constants_1 = require('../navigation/routes.constants');
var core_1 = require('@angular/core');
var ViewSongService = (function () {
    function ViewSongService(http) {
        this.http = http;
    }
    ViewSongService.prototype.getSong = function (id) {
        return this.http.get(view_song_constants_1.GET_SONG_URL.replace(":id", id));
    };
    ViewSongService.prototype.getSongUrl = function (song) {
        return "/" + routes_constants_1.ROUTE_VIEW_SONG
            .replace(":id", "" + song.id)
            .replace(":name", song.name)
            .replace(":writer", "" + song.writer)
            .replace(":composer", "" + song.composer);
    };
    ViewSongService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ViewSongService);
    return ViewSongService;
}());
exports.ViewSongService = ViewSongService;
//# sourceMappingURL=view-song.service.js.map