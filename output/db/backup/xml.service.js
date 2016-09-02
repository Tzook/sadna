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
var server_songs_service_1 = require('../../songs/server-songs.service');
var server_groups_service_1 = require('../../groups/server-groups.service');
var server_words_service_1 = require('../../words/server-words.service');
var server_db_1 = require('../../main/server-db');
var xml2js = require('xml2js');
var XmlService = (function () {
    function XmlService(_dbService, _songsService, _groupsService, _wordsService) {
        this._dbService = _dbService;
        this._songsService = _songsService;
        this._groupsService = _groupsService;
        this._wordsService = _wordsService;
        this._parser = new xml2js.Parser();
        this._builder = new xml2js.Builder();
    }
    Object.defineProperty(XmlService.prototype, "dbClient", {
        get: function () {
            return this._dbClient = this._dbClient || this._dbService.dbClient;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create xml file string for the whole DB
     */
    XmlService.prototype.backupToXml = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xmlData = '', promiseLand = [
                _this._songsService.selectSongs(),
                _this._groupsService.selectGroups(),
                _this._wordsService.selectWords(),
                _this._wordsService.selectWordInGroup(),
                _this._wordsService.selectWordInSong(),
            ];
            Promise.all(promiseLand)
                .then(function (promises) {
                var songs = promises[0].rows, groups = promises[1].rows, words = promises[2].rows, wordInGroup = promises[3].rows, wordInSong = promises[4].rows;
                xmlData = _this._builder.buildObject({
                    songs: songs,
                    groups: groups,
                    words: words,
                    wordInGroup: wordInGroup,
                    wordInSong: wordInSong,
                });
                resolve(xmlData);
            })
                .catch(function (err) {
                console.log('err');
                reject(err);
            });
        });
    };
    /**
     * Backup from an xml string to the DB
     * The xml object will have root and in this the original object will sit
     * Also, note that everything from the xml is a string,
     *     so for int need to cast and for boolean need to check if -> expression === 'true';
     */
    XmlService.prototype.backupFromXml = function (xmlData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._parser.parseString(xmlData, function (err, restoredObj) {
                if (err) {
                    reject(err);
                }
                else {
                    var firstPromiseLand = [];
                    if (restoredObj.root.songs) {
                        firstPromiseLand.push(_this.restoreSongsTable(restoredObj.root.songs));
                    }
                    if (restoredObj.root.groups) {
                        firstPromiseLand.push(_this.restoreGroupsTable(restoredObj.root.groups));
                    }
                    if (restoredObj.root.words) {
                        firstPromiseLand.push(_this.restoreWordsTable(restoredObj.root.words));
                    }
                    Promise.all(firstPromiseLand)
                        .then(function (r) {
                        var secondPromiseLand = [];
                        // We do the second promises for tables that have foreign keys
                        if (restoredObj.root.wordInGroup) {
                            secondPromiseLand.push(_this.restoreWordInGroupTable(restoredObj.root.wordInGroup));
                        }
                        if (restoredObj.root.wordInSong) {
                            secondPromiseLand.push(_this.restoreWordInSongTable(restoredObj.root.wordInSong));
                        }
                        Promise.all(secondPromiseLand)
                            .then(function (r2) {
                            resolve(true);
                        })
                            .catch(function (e) {
                            console.log(e);
                            reject(e);
                        });
                    })
                        .catch(function (e) {
                        console.log(e);
                        reject(e);
                    });
                }
            });
        });
    };
    /**
     * Restore songs query
     */
    XmlService.prototype.restoreSongsTable = function (rows) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient, bindings = [], query = "\n                    INSERT INTO songs (id, path, name, writer, composer)\n                        values";
            for (var j = void 0, i = 0, l = rows.length * 5; i < l; i += 5) {
                j = i / 5;
                query = query + "\n                        ($" + (i + 1) + ", $" + (i + 2) + ", $" + (i + 3) + ", $" + (i + 4) + ", $" + (i + 5) + ")" + (i === l - 5 ? '' : ',');
                bindings.push(Number(rows[j].id), rows[j].path || null, rows[j].name, rows[j].writer || null, rows[j].composer || null);
            }
            query = query + "\n                ON CONFLICT DO NOTHING;";
            dbClient.query(query, bindings, function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    /**
     * Restore groups query
     */
    XmlService.prototype.restoreGroupsTable = function (rows) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient, bindings = [], query = "\n                INSERT INTO groups (id, name, is_expression)\n                    values";
            for (var j = void 0, i = 0, l = rows.length * 3; i < l; i += 3) {
                j = i / 3;
                query = query + "\n                        ($" + (i + 1) + ", $" + (i + 2) + ", $" + (i + 3) + ")" + (i === l - 3 ? '' : ',');
                bindings.push(Number(rows[j].id), rows[j].name, (rows[j].is_expression === 'true'));
            }
            query = query + "\n                ON CONFLICT DO NOTHING;";
            dbClient.query(query, bindings, function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    /**
     * Restore words query
     */
    XmlService.prototype.restoreWordsTable = function (rows) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient, bindings = [], query = "\n                INSERT INTO words (id, value, is_punctuation)\n                    values";
            for (var j = void 0, i = 0, l = rows.length * 3; i < l; i += 3) {
                j = i / 3;
                query = query + "\n                        ($" + (i + 1) + ", $" + (i + 2) + ", $" + (i + 3) + ")" + (i === l - 3 ? '' : ',');
                bindings.push(Number(rows[j].id), rows[j].value, (rows[j].is_punctuation === 'true'));
            }
            query = query + "\n                ON CONFLICT DO NOTHING;";
            dbClient.query(query, bindings, function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    /**
     * Restore word_in_group query
     */
    XmlService.prototype.restoreWordInGroupTable = function (rows) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient, bindings = [], query = "\n                INSERT INTO word_in_group (id, group_id, word_id)\n                    values";
            for (var j = void 0, i = 0, l = rows.length * 3; i < l; i += 3) {
                j = i / 3;
                query = query + "\n                        ($" + (i + 1) + ", $" + (i + 2) + ", $" + (i + 3) + ")" + (i === l - 3 ? '' : ',');
                bindings.push(Number(rows[j].id), Number(rows[j].group_id), Number(rows[j].word_id));
            }
            query = query + "\n                ON CONFLICT DO NOTHING;";
            dbClient.query(query, bindings, function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    /**
     * Restore word_in_song query
     */
    XmlService.prototype.restoreWordInSongTable = function (rows) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient, bindings = [], query = "\n                INSERT INTO word_in_song (id, song_id, word_id, col, row, house, sentence, word_num)\n                    values";
            for (var j = void 0, i = 0, l = rows.length * 8; i < l; i += 8) {
                j = i / 8;
                query = query + "\n                        ($" + (i + 1) + ", $" + (i + 2) + ", $" + (i + 3) + ", $" + (i + 4) + ", $" + (i + 5) + ", $" + (i + 6) + ", $" + (i + 7) + ", $" + (i + 8) + ")" + (i === l - 8 ? '' : ',');
                bindings.push(Number(rows[j].id), Number(rows[j].song_id), Number(rows[j].word_id), Number(rows[j].col), Number(rows[j].row), Number(rows[j].house), Number(rows[j].sentence), Number(rows[j].word_num));
            }
            query = query + "\n                ON CONFLICT DO NOTHING;";
            dbClient.query(query, bindings, function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    XmlService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_db_1.DbService, server_songs_service_1.SongsService, server_groups_service_1.GroupsService, server_words_service_1.WordsService])
    ], XmlService);
    return XmlService;
}());
exports.XmlService = XmlService;
//# sourceMappingURL=xml.service.js.map