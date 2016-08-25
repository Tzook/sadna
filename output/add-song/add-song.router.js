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
const add_song_constants_1 = require('./add-song.constants');
const core_1 = require('@angular/core');
let AddSongRouter = class AddSongRouter {
    constructor() {
    }
    init(app) {
        app.post(add_song_constants_1.ROUTE_URL, log);
        function log() {
            console.log('in log!!!');
        }
    }
};
AddSongRouter = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], AddSongRouter);
exports.AddSongRouter = AddSongRouter;
//# sourceMappingURL=add-song.router.js.map