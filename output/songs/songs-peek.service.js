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
var songs_list_constants_1 = require('../songs-list/songs-list.constants');
var core_1 = require('@angular/core');
var SongsPeekService = (function () {
    function SongsPeekService(http) {
        this.http = http;
    }
    SongsPeekService.prototype.getSongs = function (word) {
        return this.http.get(songs_list_constants_1.GET_SONGS_BY_WORD_URL.replace(":word", word));
    };
    SongsPeekService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SongsPeekService);
    return SongsPeekService;
}());
exports.SongsPeekService = SongsPeekService;
//# sourceMappingURL=songs-peek.service.js.map