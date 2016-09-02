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
var core_1 = require('@angular/core');
var server_db_1 = require('../main/server-db');
var server_words_service_1 = require('../words/server-words.service');
var SongsService = (function () {
    function SongsService(_dbService, _wordsService) {
        this._dbService = _dbService;
        this._wordsService = _wordsService;
    }
    /**
     * Insert song safe to songs table
     */
    SongsService.prototype.insertSong = function (song) {
        var _this = this;
        console.info("inserting song " + song.name);
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            // running safe insert, since song name must be unique
            dbClient.query("\n                WITH s_song AS (\n                    SELECT id, name\n                    FROM songs\n                    WHERE name = $1\n                ),\n                i_song AS (\n                    INSERT INTO songs (name, path, writer, composer)\n                    SELECT $1, $2, $3, $4\n                    WHERE NOT EXISTS (SELECT 1 FROM s_song)\n                    RETURNING id, name\n                )\n                SELECT id, name\n                FROM i_song\n                UNION ALL --only one of those will be filled\n                SELECT id, name\n                FROM s_song\n            ", [song.name, song.path, song.writer, song.composer], function (e, result) {
                if (e)
                    reject(e);
                else {
                    console.info("done inserting song " + song.name);
                    resolve(result);
                }
            });
        });
    };
    /**
     * Load a song in the DB, from a song and all it's components
     */
    SongsService.prototype.loadSong = function (song, words, wordInSong) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("start loading song " + song.name + " with " + words.length + " words.");
            var promiseLand = [], wordPromises = [], song_id = null;
            promiseLand.push(_this.insertSong(song));
            promiseLand.push(_this._wordsService.insertWords(words));
            Promise.all(promiseLand)
                .then(function (promiseLandRes) {
                console.log("resolved words and song for " + song.name);
                var songResult = promiseLandRes.shift(), song_id = songResult.rows[0].id;
                _this._wordsService.insertWordsInSong(wordInSong, words, song_id)
                    .then(function (wordPromisesRes) {
                    console.log("resolved all for " + song.name);
                    resolve(true);
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    };
    SongsService.prototype.selectSongs = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            dbClient.query("\n                SELECT * FROM songs;\n            ", function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    /**
     * Get all the words in a song
     */
    SongsService.prototype.getCompleteSongById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("getting complete song for id: " + id);
            var dbClient = _this.dbClient;
            dbClient.query("\n                select w.id, w.song_id, w.word_id, ww.value as word_value, ww.is_punctuation, w.col, w.\"row\", w.house, w.sentence, w.word_num\n                from\n                    word_in_song w,\n                    words ww\n                where\n                    w.song_id = $1\n                    and ww.id = w.word_id;\n            ", [id], function (e, result) {
                if (e)
                    reject(e);
                else {
                    console.log("done getting complete song for id: " + id);
                    resolve(result);
                }
            });
        });
    };
    /**
     * Stats for amount of words and letters in a song rows,
     * With this we can also show the amount of words and letters overall in a song
     */
    SongsService.prototype.selectSongStatisticsRows = function (songId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            dbClient.query("\n                select s.id, ws.row, count(ws.id) as words_count, sum(char_length(w.value)) as letters_sum\n                    from word_in_song ws inner join songs s on ws.song_id = s.id\n                    inner join words w on ws.word_id = w.id\n                    where song_id = $1\n                    group by ws.row, s.id;\n            ", [songId], function (e, result) {
                if (e)
                    reject(e);
                else {
                    resolve(result);
                }
            });
        });
    };
    /**
     * Stats for amount of words and letters in a song houses,
     * With this we can also show the amount of words and letters overall in a song
     */
    SongsService.prototype.selectSongStatisticsHouses = function (songId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            dbClient.query("\n                select s.id, ws.house, count(ws.id) as words_count, sum(char_length(w.value)) as letters_sum\n                    from word_in_song ws inner join songs s on ws.song_id = s.id\n                    inner join words w on ws.word_id = w.id\n                    where song_id = $1\n                    group by ws.house, s.id;\n            ", [songId], function (e, result) {
                if (e)
                    reject(e);
                else {
                    resolve(result);
                }
            });
        });
    };
    Object.defineProperty(SongsService.prototype, "dbClient", {
        get: function () {
            return this._dbClient = this._dbClient || this._dbService.dbClient;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Mock loader to check that everything is going well
     */
    SongsService.prototype.mockLoader = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var song = {
                name: 'noamel_song44',
            };
            var words = [];
            var wordsInSong = [];
            var val = 'word';
            for (var i = 0; i < 50; i++) {
                words.push({
                    value: val + "_" + i,
                    is_punctuation: false,
                });
                wordsInSong.push({
                    col: i,
                    row: 1 + i,
                    house: 1,
                    sentence: i,
                    word_num: i + 2,
                });
            }
            _this.loadSong(song, words, wordsInSong)
                .then(function () {
                console.log('done!!');
                resolve(true);
            })
                .catch(function (e) {
                console.log('error', e);
                reject(e);
            });
        });
    };
    SongsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_db_1.DbService, server_words_service_1.WordsService])
    ], SongsService);
    return SongsService;
}());
exports.SongsService = SongsService;
//# sourceMappingURL=server-songs.service.js.map