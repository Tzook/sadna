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
var server_db_1 = require('../db/server-db');
var server_words_service_1 = require('../words/server-words.service');
var GroupsService = (function () {
    function GroupsService(_dbService, _wordsService) {
        this._dbService = _dbService;
        this._wordsService = _wordsService;
    }
    Object.defineProperty(GroupsService.prototype, "dbClient", {
        get: function () {
            return this._dbClient = this._dbClient || this._dbService.dbClient;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Insert song safe to songs table
     */
    GroupsService.prototype.insertGroup = function (group) {
        var _this = this;
        console.info("inserting group " + group.name);
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            // running safe insert, since song name must be unique
            dbClient.query("\n                WITH s_group AS (\n                    SELECT id, name\n                    FROM groups\n                    WHERE UPPER(name) like UPPER($1)\n                ),\n                i_group AS (\n                    INSERT INTO groups (name, is_expression)\n                    SELECT $1, $2\n                    WHERE NOT EXISTS (SELECT 1 FROM s_group)\n                    RETURNING id, name\n                )\n                SELECT id, name\n                FROM i_group\n                UNION ALL --only one of those will be filled\n                SELECT id, name\n                FROM s_group\n            ", [group.name, group.is_expression], function (e, result) {
                if (e)
                    reject(e);
                else {
                    console.info("done inserting group " + group.name);
                    resolve(result);
                }
            });
        });
    };
    GroupsService.prototype.loadGroup = function (group, words) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("start loading group " + group.name + " with " + words.length + " words.");
            var promiseLand = [], wordPromises = [], group_id = null;
            promiseLand.push(_this.insertGroup(group));
            promiseLand.push(_this._wordsService.insertWords(words));
            Promise.all(promiseLand)
                .then(function (promiseLandRes) {
                console.log("resolved words and group for " + group.name);
                var songResult = promiseLandRes.shift(), group_id = songResult.rows[0].id;
                _this._wordsService.insertWordsInGroup(words, group_id)
                    .then(function (wordPromisesRes) {
                    console.log("resolved all for " + group.name);
                    resolve(true);
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    };
    GroupsService.prototype.updateGroup = function (id, words) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("start updating group " + id + " with " + words.length + " words.");
            _this._wordsService.removeWordsInGroup(id)
                .then(function () {
                return _this._wordsService.insertWordsInGroup(words, id);
            })
                .then(function (wordPromisesRes) {
                console.log("resolved all for " + id);
                resolve(true);
            })
                .catch(reject);
        });
    };
    /**
     * Select all groups
     */
    GroupsService.prototype.selectGroups = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            dbClient.query("\n                SELECT * FROM groups;\n            ", function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    GroupsService.prototype.selectGroup = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            dbClient.query("\n                select wig.id, w.value\n                from word_in_group as wig,\n                    words as w\n                where group_id = $1\n                    and w.id = wig.word_id\n                order by id;\n            ", [id], function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    };
    /**
     * Will get words in order in all songs
     */
    GroupsService.prototype.getWordGroupPossibilities = function (words) {
        var _this = this;
        console.info("getting list of words for " + words.toString());
        var startTime = Date.now();
        return new Promise(function (resolve, reject) {
            var dbClient = _this.dbClient;
            // running safe insert, since song name must be unique
            dbClient.query("\n                select distinct s.*\n                from first_word($1, $2) as f,\n                     songs as s\n                where f.song_id = s.id;\n            ", [words.shift(), words], function (e, result) {
                if (e)
                    reject(e);
                else {
                    console.info("done! getting list of words for " + words.toString() + " and it took " + (Date.now() - startTime) + "ms!");
                    resolve(result);
                }
            });
        });
    };
    /**
     * init the getWordGroupPossibilities needed functions,
     * they should be registered in the db already, but just in case
     */
    GroupsService.prototype.initNextWordFunctions = function () {
        var dbClient = this.dbClient;
        return new Promise(function (resolve, reject) {
            dbClient.query("\n                CREATE OR REPLACE FUNCTION next_word(s_id int, cur_col int, cur_row int, w_val text, word_vals text[])\n                RETURNS SETOF word_in_song AS\n                $$\n                DECLARE\n                    l int;         -- will be set for the word_vals array length\n                    n1_col int;    -- will be set to the next possible column with the same row (cur_row, cur_col+1)\n                    n2_row int;    -- will be set to the next possible row with the coloumn 0 (cur_row+1, 0)\n                BEGIN\n                    if word_vals = '{}' then -- this is the stop condition to return the word\n                        return query\n                            select * from word_in_song\n                                where\n                                    song_id = s_id\n                                    and word_id in (\n                                        select id from words\n                                            where UPPER(value) like UPPER(w_val)\n                                    )\n                                    and col = cur_col\n                                    and row = cur_row;\n                    else\n                        l := array_length(word_vals, 1);\n                        n1_col := cur_col + 1;\n                        n2_row := cur_row + 1;\n                        return query -- build n1 as the next column and n2 as the first word in the next row, note that we need to make sure there is no word at all in the next column for using the next row.\n                            with n1 as (\n                                select * from next_word(s_id, n1_col, cur_row, word_vals[1], word_vals[2:l])\n                            ),\n                            n2 as (\n                                select * from next_word(s_id, 0, n2_row, word_vals[1], word_vals[2:l])\n                                    where not exists ( -- make sure n1 is empty\n                                        select * from word_in_song\n                                            where\n                                                song_id = s_id\n                                                and col = n1_col\n                                                and row = cur_row\n                                    )\n                            ),\n                            r as (\n                                select * from word_in_song\n                                where\n                                song_id = s_id\n                                and word_id in (\n                                    select id from words\n                                    where UPPER(value) like UPPER(w_val)\n                                )\n                                and col = cur_col\n                                and row = cur_row\n                            ) -- r is what we want to add n1 or n2 results to, becuase if we got this far than it's value is good\n                            select * from r where exists (select * from n1) union select * from n1\n                            union\n                            select * from r where exists (select * from n2) union select * from n2;\n                    end if;\n                    RETURN;\n                END\n                $$ LANGUAGE plpgsql;\n\n                -- this function will look up a word, and for each findings will search if the next set of words\n                -- it will resolve that recursivley by adding up the results of either the next column or the next row in column 0\n                CREATE OR REPLACE FUNCTION first_word(word_val text, word_vals text[])\n                    RETURNS SETOF word_in_song AS\n                $$\n                DECLARE\n                    r word_in_song%rowtype;\n                BEGIN\n                    for r in select * from word_in_song\n                        where word_id in (\n                                SELECT id\n                                FROM words\n                                WHERE UPPER (value) like UPPER(word_val))\n                    loop\n                        return query\n                            select * from\n                                next_word(r.song_id, r.col, r.\"row\", word_val, word_vals);\n                    end loop;\n                    RETURN;\n                END\n                $$ LANGUAGE plpgsql;\n            ", function (e, result) {
                if (e)
                    reject(e);
                else
                    resolve(true);
            });
        });
    };
    /**
     * @param {array} arr
     * @returns
     */
    GroupsService.prototype.getQueryVarsForArray = function (arr) {
        var queryVars = "";
        for (var i = 0, l = arr.length; i < l; i++) {
            queryVars += "$" + (i + 1) + (i !== l - 1 ? ',' : '');
        }
        return queryVars;
    };
    /**
     * Mock to check that eveyrthing is working curretly with groups
     */
    GroupsService.prototype.mockLoader = function () {
        var group = {
            name: 'noam_group',
            is_expression: false,
        };
        var words = [];
        var val = 'word_group';
        for (var i = 0; i < 10; i++) {
            words.push({
                value: val + "_" + i,
                is_punctuation: false,
            });
        }
        this.loadGroup(group, words)
            .catch(function (err) { return console.log(err); });
    };
    GroupsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_db_1.DbService, server_words_service_1.WordsService])
    ], GroupsService);
    return GroupsService;
}());
exports.GroupsService = GroupsService;
//# sourceMappingURL=server-groups.service.js.map