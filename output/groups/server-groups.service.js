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
let GroupsService = class GroupsService {
    constructor(_dbService, _wordsService) {
        this._dbService = _dbService;
        this._wordsService = _wordsService;
    }
    get dbClient() {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
    }
    /**
     * Insert song safe to songs table
     */
    insertGroup(group) {
        console.info(`inserting group ${group.name}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            // running safe insert, since song name must be unique
            dbClient.query(`
                WITH s_group AS (
                    SELECT id, name
                    FROM groups
                    WHERE name = $1
                ),
                i_group AS (
                    INSERT INTO groups (name, is_expression)
                    SELECT $1, $2
                    WHERE NOT EXISTS (SELECT 1 FROM s_group)
                    RETURNING id, name
                )
                SELECT id, name
                FROM i_group
                UNION ALL --only one of those will be filled
                SELECT id, name
                FROM s_group
            `, [group.name, group.is_expression], (e, result) => {
                if (e)
                    reject(e);
                else {
                    console.info(`done inserting group ${group.name}`);
                    resolve(result);
                }
            });
        });
    }
    loadGroup(group, words) {
        return new Promise((resolve, reject) => {
            console.log(`start loading group ${group.name} with ${words.length} words.`);
            let promiseLand = [], wordPromises = [], group_id = null;
            promiseLand.push(this.insertGroup(group));
            promiseLand.push(this._wordsService.insertWords(words));
            Promise.all(promiseLand)
                .then(promiseLandRes => {
                console.log(`resolved words and group for ${group.name}`);
                let songResult = promiseLandRes.shift(), group_id = songResult.rows[0].id;
                this._wordsService.insertWordsInGroup(words, group_id)
                    .then(wordPromisesRes => {
                    console.log(`resolved all for ${group.name}`);
                    resolve(true);
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    /**
     * Select all groups
     */
    selectGroups() {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                SELECT * FROM groups;
            `, (e, result) => {
                if (e)
                    reject(e);
                else
                    resolve(result);
            });
        });
    }
    /**
     * Will get words in order in all songs
     */
    getWordGroupPossibilities(words) {
        console.info(`getting list of words for ${words.toString}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            // running safe insert, since song name must be unique
            dbClient.query(`
            CREATE OR REPLACE FUNCTION next_word(s_id int, cur_col int, cur_row int, w_val text, word_vals text[])
	            RETURNS SETOF word_in_song AS
            $$
            DECLARE
                l int;
                n1_col int;
                n2_row int;
            BEGIN
                if word_vals = '{}' then
                    return query 
                        select * from word_in_song
                            where
                                song_id = s_id
                                and word_id in (
                                    select id from words
                                        where value = w_val
                                )
                                and col = cur_col
                                and row = cur_row;
                else
                    l := array_length(word_vals, 1);
                    n1_col := cur_col + 1;
                    n2_row := cur_row + 1;
                    return query
                        with n1 as (
                            select * from next_word(s_id, n1_col, cur_row, word_vals[1], word_vals[2:l])
                        ),
                        n2 as (
                            select * from next_word(s_id, 0, n2_row, word_vals[1], word_vals[2:l])
                                where not exists (
                                    select * from word_in_song
                                        where
                                            song_id = s_id
                                            and col = n1_col
                                            and row = cur_row
                                )
                        ),
                        r as (
                            select * from word_in_song
                            where
                            song_id = s_id
                            and word_id in (
                                select id from words
                                where value = w_val
                            )
                            and col = cur_col
                            and row = cur_row
                        )
                        select * from r where exists (select * from n1) union select * from n1
                        union
                        select * from r where exists (select * from n2) union select * from n2;
                end if;
                RETURN;          
            END
            $$ LANGUAGE plpgsql;

            CREATE OR REPLACE FUNCTION first_word(word_val text, word_vals text[])
                RETURNS SETOF word_in_song AS
            $$
            DECLARE
                r word_in_song%rowtype;
            BEGIN
                for r in select * from word_in_song
                    where word_id in (
                            SELECT id
                            FROM words
                            WHERE value = word_val)
                loop
                    return query
                        select * from
                            next_word(r.song_id, r.col, r."row", word_val, word_vals);
                end loop;
                RETURN;  
            END
            $$ LANGUAGE plpgsql;

            select * from first_word($1, $2);
            `, [words.shift(), words], (e, result) => {
                if (e)
                    reject(e);
                else {
                    console.info(`getting list of words for ${words.toString}`);
                    resolve(result);
                }
            });
        });
    }
    /**
     * Mock to check that eveyrthing is working curretly with groups
     */
    mockLoader() {
        let group = {
            name: 'noam_group',
            is_expression: false,
        };
        let words = [];
        let val = 'word_group';
        for (let i = 0; i < 10; i++) {
            words.push({
                value: `${val}_${i}`,
                is_punctuation: false,
            });
        }
        this.loadGroup(group, words)
            .catch(err => console.log(err));
    }
};
GroupsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_db_1.DbService, server_words_service_1.WordsService])
], GroupsService);
exports.GroupsService = GroupsService;
//# sourceMappingURL=server-groups.service.js.map