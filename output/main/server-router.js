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
const server_songs_router_1 = require('../routers/server-songs.router');
const core_1 = require('@angular/core');
let Router = class Router {
    constructor(_songsRouter) {
        this._songsRouter = _songsRouter;
    }
    init(app) {
        this._app = app;
        let routers = [
            this._songsRouter,
        ];
        for (let i = 0, l = routers.length; i < l; i++) {
            routers[i].init(app);
        }
    }
};
Router = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_songs_router_1.SongsRouter])
], Router);
exports.Router = Router;
//# sourceMappingURL=server-router.js.map