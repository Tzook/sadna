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
const server_db_1 = require('../main/server-db');
const core_1 = require('@angular/core');
let SongsRouter = class SongsRouter {
    constructor(_dbService) {
        this._dbService = _dbService;
    }
    init(app) {
        this._app = app;
        let dbClient = this._dbService.dbClient;
        console.log('~~dumping information_schema.tables~~');
        dbClient
            .query('SELECT table_schema,table_name FROM information_schema.tables;')
            .on('row', (row) => {
            console.log(JSON.stringify(row));
        });
    }
};
SongsRouter = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_db_1.DbService])
], SongsRouter);
exports.SongsRouter = SongsRouter;
//# sourceMappingURL=server-songs.router.js.map