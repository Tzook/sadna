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
var add_song_constants_1 = require('./add-song.constants');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var AddSongService = (function () {
    function AddSongService(http) {
        this.http = http;
    }
    AddSongService.prototype.addSong = function (song) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(add_song_constants_1.ADD_SONG_URL, JSON.stringify(song), options);
    };
    AddSongService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AddSongService);
    return AddSongService;
}());
exports.AddSongService = AddSongService;
//# sourceMappingURL=add-song.service.js.map