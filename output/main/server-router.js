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
const add_song_router_1 = require('../add-song/add-song.router');
const server_songs_router_1 = require('../routers/server-songs.router');
const core_1 = require('@angular/core');
let ServerRouter = class ServerRouter {
    constructor(songsRouter, addSongRouter) {
        this.songsRouter = songsRouter;
        this.addSongRouter = addSongRouter;
    }
    init(app) {
        this.app = app;
        let routers = [
            this.songsRouter,
        ];
        for (let i = 0, l = routers.length; i < l; i++) {
            routers[i].init(this.app);
        }
    }
};
ServerRouter = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_songs_router_1.SongsRouter, add_song_router_1.AddSongRouter])
], ServerRouter);
exports.ServerRouter = ServerRouter;
//# sourceMappingURL=server-router.js.map