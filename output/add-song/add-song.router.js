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
var add_song_controller_1 = require('./add-song.controller');
var add_song_middleware_1 = require('./add-song.middleware');
var add_song_constants_1 = require('./add-song.constants');
var core_1 = require('@angular/core');
var AddSongRouter = (function () {
    function AddSongRouter(addSongMiddleware, addSongController) {
        this.addSongMiddleware = addSongMiddleware;
        this.addSongController = addSongController;
    }
    AddSongRouter.prototype.init = function (app) {
        app.post(add_song_constants_1.ADD_SONG_URL, this.addSongMiddleware.validateRequest.bind(this.addSongMiddleware), this.addSongController.processSong.bind(this.addSongController), this.addSongController.insertSong.bind(this.addSongController));
    };
    AddSongRouter = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [add_song_middleware_1.AddSongMiddleware, add_song_controller_1.AddSongController])
    ], AddSongRouter);
    return AddSongRouter;
}());
exports.AddSongRouter = AddSongRouter;
//# sourceMappingURL=add-song.router.js.map