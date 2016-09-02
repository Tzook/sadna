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
var WordsService = (function () {
    function WordsService(_dbService) {
        this._dbService = _dbService;
    }
    Object.defineProperty(WordsService.prototype, "dbClient", {
        get: function () {
            return this._dbClient = this._dbClient || this._dbService.dbClient;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Insert words to words table
     */
    WordsService.prototype.insertWords = function (words) {
        var _this = this;
        console.info("inserting words amount " + words.length);
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            var bindings = [], query = "\n                INSERT INTO words (value, is_punctuation)\n                    values";
            for (var i = 0, l = words.length * 2; i < l; i += 2) {
                query = query + "\n                        ($" + (i + 1) + ", $" + (i + 2) + ")" + (i === l - 2 ? '' : ',');
                bindings.push(words[i / 2].value, words[i / 2].is_punctuation || false);
            }
            query = query + "\n                        ON CONFLICT DO NOTHING;";
            dbClient.query(query, bindings, function (e, result) {
                if (e)
                    reject(e);
                else {
                    console.info("done inserting word " + words.length);
                    resolve(result);
                }
            });
        });
    };
    /**
     * Insert words to word_in_song table
     */
    WordsService.prototype.insertWordsInSong = function (wordsInSong, words, song_id) {
        var _this = this;
        console.info("inserting word in song id: " + song_id + " and words length is: " + wordsInSong.length);
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient, j, bindings = [], query = "\n                INSERT INTO word_in_song (song_id, word_id, col, \"row\", house, sentence, word_num)\n                    values";
            for (var i = 0, l = wordsInSong.length * 6; i < l; i += 6) {
                j = i / 6;
                query = query + "\n                        (" + song_id + ", (SELECT id FROM words\n                            WHERE value = $" + (i + 1) + "\n                        ), $" + (i + 2) + ", $" + (i + 3) + ", $" + (i + 4) + ", $" + (i + 5) + ", $" + (i + 6) + ")" + (i === l - 6 ? '' : ',');
                bindings.push(words[j].value, wordsInSong[j].col, wordsInSong[j].row, wordsInSong[j].house, wordsInSong[j].sentence, wordsInSong[j].word_num);
            }
            query = query + "\n                        ON CONFLICT DO NOTHING;";
            dbClient.query(query, bindings, function (e, result) {
                if (e)
                    reject(e);
                else {
                    console.info("done inserting word in song id: " + song_id + " and words length was: " + wordsInSong.length);
                    resolve(result);
                }
            });
        });
    };
    /**
     * Insert words to word_in_group table
     */
    WordsService.prototype.insertWordsInGroup = function (words, group_id) {
        var _this = this;
        console.info("inserting word in group id: " + group_id + " and words length is: " + words.length);
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient, bindings = [], query = "\n                INSERT INTO word_in_group (group_id, word_id)\n                    values";
            for (var i = 0, l = words.length; i < l; i++) {
                query = query + "\n                        (" + group_id + ", (SELECT id FROM words\n                            WHERE value = $" + (i + 1) + ")\n                        )" + (i === l - 1 ? '' : ',');
                bindings.push(words[i].value);
            }
            query = query + "\n                        ON CONFLICT DO NOTHING;";
            dbClient.query(query, bindings, function (e, result) {
                if (e)
                    reject(e);
                else {
                    console.info("done inserting word in group id: " + group_id + " and words length was: " + words.length);
                    resolve(result);
                }
            });
        });
    };
    /**
     * Select all the words
     */
    WordsService.prototype.selectWords = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            dbClient.query("\n                SELECT * FROM words;\n            ", function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    /**
     * This selects all occournces of words what so ever
     * Add here limit if this becomes slow
     */
    WordsService.prototype.selectWordsEverywhere = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            dbClient.query("\n                select s.name as song_name, w.song_id, w.word_id, ww.value as word_value, ww.is_punctuation, w.col, w.\"row\", w.house, w.sentence, w.word_num \n            \tfrom\n            \t\tsongs s,\n            \t\tword_in_song w,\n            \t\twords ww;\n            ", function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    /**
     * Select all word_in_song table
     */
    WordsService.prototype.selectWordInSong = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            dbClient.query("\n                SELECT * FROM word_in_song;\n            ", function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    /**
     * Select all word_in_group table
     */
    WordsService.prototype.selectWordInGroup = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            dbClient.query("\n                SELECT * FROM word_in_group;\n            ", function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    /**
     * This returns a WordStatistics Result obj
     * With a lot of stats for all words:
     *     you can limit the query to some words by providing a string array and also a specific song by providing a song id
     */
    WordsService.prototype.selectWordStatistics = function (words, songId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient, query, bindings = [];
            query = "\n                select w.id, w.value, w.is_punctuation, count(ws.id) as word_count, char_length(w.value) as word_length\n                    from word_in_song ws inner join words w on ws.word_id = w.id\n                    " + (songId ? "where ws.song_id = " + songId : "");
            if (words && words.length) {
                query = query + "\n                    " + (songId ? "and" : "where") + " UPPER(w.value) in (";
                for (var i = 0, l = words.length; i < l; i++) {
                    query = query + "UPPER($" + (i + 1) + ")" + (i === l - 1 ? ')' : ',');
                    bindings.push(words[i]);
                }
            }
            query = query + "\n                    group by ws.word_id, w.id;";
            console.log(query);
            dbClient.query(query, bindings, function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    WordsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_db_1.DbService])
    ], WordsService);
    return WordsService;
}());
exports.WordsService = WordsService;
//# sourceMappingURL=server-words.service.js.map