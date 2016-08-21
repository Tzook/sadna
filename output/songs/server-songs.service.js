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
const core_1 = require('@angular/core');
const server_db_1 = require('../main/server-db');
let SongsService = class SongsService {
    constructor(_dbService) {
        this._dbService = _dbService;
    }
    insertSong(song) {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                INSERT INTO songs (name, path, writer, composer)
                    values ($1, $2, $3, $4);
            `, [song.name, song.path, song.writer, song.composer], (e, result) => {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    }
    selectSongs() {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                SELECT * FROM songs;
            `, (e, result) => {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    }
    get dbClient() {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
    }
};
SongsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_db_1.DbService])
], SongsService);
exports.SongsService = SongsService;
//# sourceMappingURL=server-songs.service.js.map