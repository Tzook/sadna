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
var view_song_controller_1 = require('./view-song.controller');
var view_song_constants_1 = require('./view-song.constants');
var core_1 = require('@angular/core');
var ViewSongRouter = (function () {
    function ViewSongRouter(viewSongController) {
        this.viewSongController = viewSongController;
    }
    ViewSongRouter.prototype.init = function (app) {
        app.get(view_song_constants_1.GET_SONG_URL, this.viewSongController.returnSong.bind(this.viewSongController));
    };
    ViewSongRouter = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [view_song_controller_1.ViewSongController])
    ], ViewSongRouter);
    return ViewSongRouter;
}());
exports.ViewSongRouter = ViewSongRouter;
//# sourceMappingURL=view-song.router.js.map