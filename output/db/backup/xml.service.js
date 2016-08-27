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
const server_songs_service_1 = require('../../songs/server-songs.service');
const server_groups_service_1 = require('../../groups/server-groups.service');
const server_words_service_1 = require('../../words/server-words.service');
const server_db_1 = require('../../main/server-db');
const xml2js = require('xml2js');
let XmlService = class XmlService {
    constructor(_dbService, _songsService, _groupsService, _wordsService) {
        this._dbService = _dbService;
        this._songsService = _songsService;
        this._groupsService = _groupsService;
        this._wordsService = _wordsService;
        this._parser = new xml2js.Parser();
        this._builder = new xml2js.Builder();
    }
    get dbClient() {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
    }
    /**
     * Create xml file string for the whole DB
     */
    backupToXml() {
        return new Promise((resolve, reject) => {
            let xmlData = '', promiseLand = [
                this._songsService.selectSongs(),
                this._groupsService.selectGroups(),
                this._wordsService.selectWords(),
                this._wordsService.selectWordInGroup(),
                this._wordsService.selectWordInSong(),
            ];
            Promise.all(promiseLand)
                .then((promises) => {
                let songs = promises[0].rows, groups = promises[1].rows, words = promises[2].rows, wordInGroup = promises[3].rows, wordInSong = promises[4].rows;
                xmlData = this._builder.buildObject({
                    songs: songs,
                    groups: groups,
                    words: words,
                    wordInGroup: wordInGroup,
                    wordInSong: wordInSong,
                });
                resolve(xmlData);
            })
                .catch(err => {
                console.log('err');
                reject(err);
            });
        });
    }
    /**
     * Backup from an xml string to the DB
     * The xml object will have root and in this the original object will sit
     * Also, note that everything from the xml is a string,
     *     so for int need to cast and for boolean need to check if -> expression === 'true';
     */
    backupFromXml(xmlData) {
        return new Promise((resolve, reject) => {
            this._parser.parseString(xmlData, (err, restoredObj) => {
                if (err) {
                    reject(err);
                }
                else {
                    let firstPromiseLand = [];
                    if (restoredObj.root.songs) {
                        firstPromiseLand.push(this.restoreSongsTable(restoredObj.root.songs));
                    }
                    if (restoredObj.root.groups) {
                        firstPromiseLand.push(this.restoreGroupsTable(restoredObj.root.groups));
                    }
                    if (restoredObj.root.words) {
                        firstPromiseLand.push(this.restoreWordsTable(restoredObj.root.words));
                    }
                    Promise.all(firstPromiseLand)
                        .then(r => {
                        let secondPromiseLand = [];
                        // We do the second promises for tables that have foreign keys
                        if (restoredObj.root.wordInGroup) {
                            secondPromiseLand.push(this.restoreWordInGroupTable(restoredObj.root.wordInGroup));
                        }
                        if (restoredObj.root.wordInSong) {
                            secondPromiseLand.push(this.restoreWordInSongTable(restoredObj.root.wordInSong));
                        }
                        Promise.all(secondPromiseLand)
                            .then(r2 => {
                            resolve(true);
                        })
                            .catch(e => {
                            console.log(e);
                            reject(e);
                        });
                    })
                        .catch(e => {
                        console.log(e);
                        reject(e);
                    });
                }
            });
        });
    }
    /**
     * Restore songs query
     */
    restoreSongsTable(rows) {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient, bindings = [], query = `
                    INSERT INTO songs (id, path, name, writer, composer)
                        values`;
            for (let j, i = 0, l = rows.length * 5; i < l; i += 5) {
                j = i / 5;
                query = `${query}
                        ($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4}, $${i + 5})${i === l - 5 ? '' : ','}`;
                bindings.push(Number(rows[j].id), rows[j].path || null, rows[j].name, rows[j].writer || null, rows[j].composer || null);
            }
            query = `${query}
                ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e, result) => {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    }
    /**
     * Restore groups query
     */
    restoreGroupsTable(rows) {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient, bindings = [], query = `
                INSERT INTO groups (id, name, is_expression)
                    values`;
            for (let j, i = 0, l = rows.length * 3; i < l; i += 3) {
                j = i / 3;
                query = `${query}
                        ($${i + 1}, $${i + 2}, $${i + 3})${i === l - 3 ? '' : ','}`;
                bindings.push(Number(rows[j].id), rows[j].name, (rows[j].is_expression === 'true'));
            }
            query = `${query}
                ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e, result) => {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    }
    /**
     * Restore words query
     */
    restoreWordsTable(rows) {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient, bindings = [], query = `
                INSERT INTO words (id, value, is_punctuation)
                    values`;
            for (let j, i = 0, l = rows.length * 3; i < l; i += 3) {
                j = i / 3;
                query = `${query}
                        ($${i + 1}, $${i + 2}, $${i + 3})${i === l - 3 ? '' : ','}`;
                bindings.push(Number(rows[j].id), rows[j].value, (rows[j].is_punctuation === 'true'));
            }
            query = `${query}
                ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e, result) => {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    }
    /**
     * Restore word_in_group query
     */
    restoreWordInGroupTable(rows) {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient, bindings = [], query = `
                INSERT INTO word_in_group (id, group_id, word_id)
                    values`;
            for (let j, i = 0, l = rows.length * 3; i < l; i += 3) {
                j = i / 3;
                query = `${query}
                        ($${i + 1}, $${i + 2}, $${i + 3})${i === l - 3 ? '' : ','}`;
                bindings.push(Number(rows[j].id), Number(rows[j].group_id), Number(rows[j].word_id));
            }
            query = `${query}
                ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e, result) => {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    }
    /**
     * Restore word_in_song query
     */
    restoreWordInSongTable(rows) {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient, bindings = [], query = `
                INSERT INTO word_in_song (id, song_id, word_id, col, row, house, sentence, word_num)
                    values`;
            for (let j, i = 0, l = rows.length * 8; i < l; i += 8) {
                j = i / 8;
                query = `${query}
                        ($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4}, $${i + 5}, $${i + 6}, $${i + 7}, $${i + 8})${i === l - 8 ? '' : ','}`;
                bindings.push(Number(rows[j].id), Number(rows[j].song_id), Number(rows[j].word_id), Number(rows[j].col), Number(rows[j].row), Number(rows[j].house), Number(rows[j].sentence), Number(rows[j].word_num));
            }
            query = `${query}
                ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e, result) => {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    }
};
XmlService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_db_1.DbService, server_songs_service_1.SongsService, server_groups_service_1.GroupsService, server_words_service_1.WordsService])
], XmlService);
exports.XmlService = XmlService;
//# sourceMappingURL=xml.service.js.map