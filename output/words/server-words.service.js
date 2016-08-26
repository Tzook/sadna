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
let WordsService = class WordsService {
    constructor(_dbService) {
        this._dbService = _dbService;
    }
    get dbClient() {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
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
     * Insert words to word_in_group table
     */
    insertWordsInGroup(words, group_id) {
        console.info(`inserting word in group id: ${group_id} and words length is: ${words.length}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient, bindings = [], query = `
                INSERT INTO word_in_group (group_id, word_id)
                    values`;
            for (let i = 0, l = words.length; i < l; i++) {
                query = `${query}
                        (${group_id}, (SELECT id FROM words
                            WHERE value = $${i + 1})
                        )${i === l - 1 ? '' : ','}`;
                bindings.push(words[i].value);
            }
            query = `${query}
                        ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e, result) => {
                if (e)
                    reject(e);
                else {
                    console.info(`done inserting word in group id: ${group_id} and words length was: ${words.length}`);
                    resolve(result);
                }
            });
        });
    }
};
WordsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_db_1.DbService])
], WordsService);
exports.WordsService = WordsService;
//# sourceMappingURL=server-words.service.js.map