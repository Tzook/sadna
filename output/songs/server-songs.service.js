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
     * Insert word safe to words table
     */
    insertWord(word) {
        console.info(`inserting word ${word.value}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            // running safe insert, since word value must be unique
            dbClient.query(`
                WITH s_word AS (
                    SELECT id, value
                    FROM words
                    WHERE value = $1
                ),
                i_word AS (
                    INSERT INTO words (value, is_punctuation)
                    SELECT $1, $2
                    WHERE NOT EXISTS (SELECT 1 FROM s_word)
                    RETURNING id, value
                )
                SELECT id, value
                FROM i_word
                UNION ALL
                SELECT id, value
                FROM s_word
            `, [word.value, word.is_punctuation], (e, result) => {
                if (e)
                    reject(e);
                else {
                    console.info(`done inserting word ${word.value}`);
                    resolve(result);
                }
            });
        });
    }
    /**
     * Insert words to words table
     */
    insertWords(words) {
        console.info(`inserting words amount ${words.length}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            let bindings = [], query = `
                INSERT INTO words (value, is_punctuation)
                    values`;
            for (let i = 0, l = words.length * 2; i < l; i += 2) {
                query = `${query}
                        ($${i + 1}, $${i + 2})${i === l - 2 ? '' : ','}`;
                bindings.push(words[i / 2].value, words[i / 2].is_punctuation || false);
            }
            query = `${query}
                        ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e, result) => {
                if (e)
                    reject(e);
                else {
                    console.info(`done inserting word ${words.length}`);
                    resolve(result);
                }
            });
        });
    }
    /**
     * Insert word in song safe to word_in_song table
     */
    insertWordInSong(wordInSong) {
        console.info(`inserting word in song id: ${wordInSong.song_id} and word id: ${wordInSong.word_id}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            // running safe insert, since word in song value must be unique
            dbClient.query(`
                WITH s_wis AS (
                    SELECT id, song_id, word_id, col, "row", house, sentence, word_num
                    FROM word_in_song
                    WHERE song_id = $1 AND word_id = $2 AND col = $3 AND "row" = $4 AND house = $5 AND sentence = $6 AND word_num = $7
                ),
                i_wis AS (
                    INSERT INTO word_in_song (song_id, word_id, col, "row", house, sentence, word_num)
                    SELECT $1, $2, $3, $4, $5, $6, $7
                    WHERE NOT EXISTS (SELECT 1 FROM s_wis)
                    RETURNING id
                )
                SELECT id
                FROM s_wis
                UNION ALL
                SELECT id
                FROM i_wis;
            `, [wordInSong.song_id, wordInSong.word_id, wordInSong.col, wordInSong.row, wordInSong.house, wordInSong.sentence, wordInSong.word_num], (e, result) => {
                if (e)
                    reject(e);
                else {
                    console.info(`inserting word in song id: ${wordInSong.song_id} and word id: ${wordInSong.word_id}`);
                    resolve(result);
                }
            });
        });
    }
    /**
     * Insert words to word_in_song table
     */
    insertWordsInSong(wordsInSong, words, song_id) {
        console.info(`inserting word in song id: ${song_id} and words length is: ${wordsInSong.length}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient, j, bindings = [], query = `
                INSERT INTO word_in_song (song_id, word_id, col, "row", house, sentence, word_num)
                    values`;
            for (let i = 0, l = wordsInSong.length * 6; i < l; i += 6) {
                j = i / 6;
                query = `${query}
                        (${song_id}, (SELECT id FROM words
                            WHERE value = $${i + 1}
                        ), $${i + 2}, $${i + 3}, $${i + 4}, $${i + 5}, $${i + 6})${i === l - 6 ? '' : ','}`;
                bindings.push(words[j].value, wordsInSong[j].col, wordsInSong[j].row, wordsInSong[j].house, wordsInSong[j].sentence, wordsInSong[j].word_num);
            }
            query = `${query}
                        ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e, result) => {
                if (e)
                    reject(e);
                else {
                    console.info(`done inserting word in song id: ${song_id} and words length was: ${wordsInSong.length}`);
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
            promiseLand.push(this.insertWords(words));
            Promise.all(promiseLand)
                .then(promiseLandRes => {
                console.log(`resolved words and song for ${song.name}`);
                let songResult = promiseLandRes.shift(), song_id = songResult.rows[0].id;
                this.insertWordsInSong(wordInSong, words, song_id)
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
    getCompleteSongByName(name) {
        return new Promise((resolve, reject) => {
            console.log(`getting complete song for: ${name}`);
            let dbClient = this.dbClient;
            dbClient.query(`
                select w.id, s.name as song_name, w.song_id, w.word_id, ww.value as word_value, ww.is_punctuation, w.col, w."row", w.house, w.sentence, w.word_num 
                from
                    songs s,
                    word_in_song w,
                    words ww
                where
                    s.name = $1
                    and ww.id = w.word_id;
            `, [name], (e, result) => {
                if (e)
                    reject(e);
                else {
                    console.log(`done getting complete song for: ${name}`);
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
    __metadata('design:paramtypes', [server_db_1.DbService])
], SongsService);
exports.SongsService = SongsService;
//# sourceMappingURL=server-songs.service.js.map