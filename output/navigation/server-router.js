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
var view_words_router_1 = require('../view-words/view-words.router');
var groups_router_1 = require('../groups/groups.router');
var view_song_router_1 = require('../view-song/view-song.router');
var songs_list_router_1 = require('../songs-list/songs-list.router');
var add_song_router_1 = require('../add-song/add-song.router');
var xml_router_1 = require('../db/backup/xml.router');
var core_1 = require('@angular/core');
var ServerRouter = (function () {
    function ServerRouter(addSongRouter, songsListRouter, viewWordsRouter, groupsRouter, viewSongRouter, xmlRouter) {
        this.addSongRouter = addSongRouter;
        this.songsListRouter = songsListRouter;
        this.viewWordsRouter = viewWordsRouter;
        this.groupsRouter = groupsRouter;
        this.viewSongRouter = viewSongRouter;
        this.xmlRouter = xmlRouter;
    }
    ServerRouter.prototype.init = function (app) {
        this.app = app;
        var routers = [
            this.addSongRouter,
            this.songsListRouter,
            this.viewWordsRouter,
            this.xmlRouter,
            this.viewSongRouter,
            this.groupsRouter,
        ];
        for (var i = 0, l = routers.length; i < l; i++) {
            routers[i].init(this.app);
        }
    };
    ServerRouter = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [add_song_router_1.AddSongRouter, songs_list_router_1.SongsListRouter, view_words_router_1.ViewWordsRouter, groups_router_1.GroupsRouter, view_song_router_1.ViewSongRouter, xml_router_1.XmlRouter])
    ], ServerRouter);
    return ServerRouter;
}());
exports.ServerRouter = ServerRouter;
//# sourceMappingURL=server-router.js.map