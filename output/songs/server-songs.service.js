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
const server_words_service_1 = require('../words/server-words.service');
let SongsService = class SongsService {
    constructor(_dbService, _wordsService) {
        this._dbService = _dbService;
        this._wordsService = _wordsService;
    }
    /**
     * Insert song safe to songs table
     */
    insertSong(song) {
        console.info(`inserting song ${song.name}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            // running safe insert, since song name must be unique
            dbClient.query(`
                WITH s_song AS (
                    SELECT id, name
                    FROM songs
                    WHERE name = $1
                ),
                i_song AS (
                    INSERT INTO songs (name, path, writer, composer)
                    SELECT $1, $2, $3, $4
                    WHERE NOT EXISTS (SELECT 1 FROM s_song)
                    RETURNING id, name
                )
                SELECT id, name
                FROM i_song
                UNION ALL --only one of those will be filled
                SELECT id, name
                FROM s_song
            `, [song.name, song.path, song.writer, song.composer], (e, result) => {
                if (e)
                    reject(e);
                else {
                    console.info(`done inserting song ${song.name}`);
                    resolve(result);
                }
            });
        });
    }
    /**
     * Load a song in the DB, from a song and all it's components
     */
    loadSong(song, words, wordInSong) {
        return new Promise((resolve, reject) => {
            console.log(`start loading song ${song.name} with ${words.length} words.`);
            let promiseLand = [], wordPromises = [], song_id = null;
            promiseLand.push(this.insertSong(song));
            promiseLand.push(this._wordsService.insertWords(words));
            Promise.all(promiseLand)
                .then(promiseLandRes => {
                console.log(`resolved words and song for ${song.name}`);
                let songResult = promiseLandRes.shift(), song_id = songResult.rows[0].id;
                this._wordsService.insertWordsInSong(wordInSong, words, song_id)
                    .then(wordPromisesRes => {
                    console.log(`resolved all for ${song.name}`);
                    resolve(true);
                })
                    .catch(reject);
            })
                .catch(reject);
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
    /**
     * Get all the words in a song
     */
    getCompleteSongById(id) {
        return new Promise((resolve, reject) => {
            console.log(`getting complete song for id: ${id}`);
            let dbClient = this.dbClient;
            dbClient.query(`
                select w.id, w.song_id, w.word_id, ww.value as word_value, ww.is_punctuation, w.col, w."row", w.house, w.sentence, w.word_num
                from
                    word_in_song w,
                    words ww
                where
                    w.song_id = $1
                    and ww.id = w.word_id;
            `, [id], (e, result) => {
                if (e)
                    reject(e);
                else {
                    console.log(`done getting complete song for id: ${id}`);
                    resolve(result);
                }
            });
        });
    }
    get dbClient() {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
    }
    /**
     * Mock loader to check that everything is going well
     */
    mockLoader() {
        return new Promise((resolve, reject) => {
            let song = {
                name: 'noamel_song44',
            };
            let words = [];
            let wordsInSong = [];
            let val = 'word';
            for (let i = 0; i < 50; i++) {
                words.push({
                    value: `${val}_${i}`,
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
            this.loadSong(song, words, wordsInSong)
                .then(() => {
                console.log('done!!');
                resolve(true);
            })
                .catch(e => {
                console.log('error', e);
                reject(e);
            });
        });
    }
};
SongsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_db_1.DbService, server_words_service_1.WordsService])
], SongsService);
exports.SongsService = SongsService;
//# sourceMappingURL=server-songs.service.js.map